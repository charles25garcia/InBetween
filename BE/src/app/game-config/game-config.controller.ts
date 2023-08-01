import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { GameConfigService } from './game-config.service';
import {
  GameService,
  DeckConfigHelperService,
  UserStatsHelperService,
  MainSseService,
  PotBonusService,
} from '@shared/services';
import { UserWinnerService } from 'src/app/user-winner';
import { UserStatsService } from 'src/app/user-stats';
import {
  BetModel,
  BetParamModel,
  BetTotalModel,
  BettingResultModel,
} from '@shared/models';
import { ArraySum, BettingBuilder } from '@shared/utils';
import { BettingResultClass } from '@shared/classes';
import { DeckModeEnum } from '@shared/enums';
import { UserBetLockedService } from '../user-bet-locked';
import { CommissionHistoryService } from '../commission-history';
import { DealHistoryService } from '../deal-history';
import { UserBetLockedDto } from '@core/dtos';
import { MoneyTypeEnum } from '@core/enums';
import { CommissionService } from '../commission/commission.service';

@Controller('game')
export class GameConfigController {
  constructor(
    private gameConfigService: GameConfigService,
    private gameService: GameService,
    private userStatsService: UserStatsService,
    private userStatsHelperService: UserStatsHelperService,
    private userWinnerService: UserWinnerService,
    private deckConfigHelperService: DeckConfigHelperService,
    private userBetLockedService: UserBetLockedService,
    private mainSseService: MainSseService,
    private potBonusService: PotBonusService,
    private commissionHistoryService: CommissionHistoryService,
    private commissionService: CommissionService,
    private dealHistoryService: DealHistoryService,
  ) {
    this.gameService.lifeCycleProccess();
    this.gameConfigService.startDeckDealer();

    this.gameService.deckConfigUI$.subscribe(async (deck) => {
      await this.gameConfigService.setDeckMode(deck.mode);
    });
  }

  @Get('/get-stats/:userId')
  async getStats(@Param('userId') userId: string) {
    const userStats = await this.userStatsService.getStatsByUserId(userId);

    if (!userStats) {
      return {
        points: 0,
        chips: 0,
      };
    }

    const userBets = await this.userBetLockedService.currentBet(userId);

    const totalChips = ArraySum(userBets.map((i) => i.chips));
    const totalPoints = ArraySum(userBets.map((i) => i.points));

    return {
      ...userStats,
      points: userStats.points - totalPoints,
      chips: userStats.chips - totalChips,
      userBets,
      pointsLocked: totalPoints > 0,
      chipsLocked: totalChips > 0,
    };
  }

  @Get('deck-data')
  async getDeckData() {
    return this.gameService.deckConfig;
  }

  @Get('chips-bet-locked-data')
  async getBetLockedData() {
    const chipsBetTotal = await this.userBetLockedService.getTotalChipsBet();

    return chipsBetTotal;
  }

  @Get('pot-bonus-data')
  async getPotBonusData() {
    return this.deckConfigHelperService.getCurrentPotBonusFromDB();
  }

  @Post('start')
  async start(): Promise<void> {
    await this.gameConfigService.startDeckDealer();

    this.gameService.start();
  }

  @Post('stop')
  async stop(): Promise<void> {
    await this.gameConfigService.stopDeckDealer();
    await this.gameConfigService.setDeckMode(DeckModeEnum.Shuffle);
    this.gameService.stop();
  }

  @Post('submit-points-bet')
  async submitPointsBet(
    @Body()
    { bets, userId }: BetParamModel,
  ) {
    const currentStats = await this.userStatsService.getStatsByUserId(userId);

    const totalBetAmount = ArraySum(bets.map((i) => i.amount));

    if (currentStats.points < totalBetAmount) {
      throw new Error('Invalid Points amount');
    }

    const result = new BettingResultClass(await this.getBettingResults(bets))
      .result;

    this.saveDealHistory(userId, result, MoneyTypeEnum.POINTS);

    const res = await this.userStatsService.updatePointStats(
      currentStats,
      result.prizeAmount,
      result.lostAmount,
    );

    this.mainSseService.sendUserStatsToClients({
      chips: res.chips,
      points: res.points,
      chipsLocked: false,
      pointsLocked: false,
      userId,
    });

    return { ...res, result };
  }

  @Post('submit-chips-bet')
  async submitChipsBet(
    @Body()
    { bets, userId }: BetParamModel,
  ) {
    const currentStats = await this.userStatsService.getStatsByUserId(userId);

    const totalBetAmount = ArraySum(bets.map((i) => i.amount));

    if (currentStats.chips < totalBetAmount) {
      throw new Error('Invalid Chips amount');
    }

    const currentFreePool = await this.gameConfigService.getFreePool();

    const chipsBetTotal = await this.userBetLockedService.getTotalChipsBet();

    const totalChipsDeal = ArraySum(
      chipsBetTotal.map((i) => Number(i.totalAmount)),
    );

    const betsTotal = this.getTotalBets(chipsBetTotal);

    const result = new BettingResultClass(
      await this.getBettingResults(
        bets,
        betsTotal,
        totalChipsDeal,
        currentFreePool,
      ),
    ).result;

    this.saveDealHistory(userId, result, MoneyTypeEnum.CHIPS);

    const res = await this.userStatsService.updateChipsStats(
      currentStats,
      result.isWinner,
      result.prizeAmount,
      result.lostAmount,
      bets.length === 1,
    );

    if (result.freePool > 0) {
      this.gameConfigService.addFreePool(result.freePool);
    }

    if (result.freePoolToDeduct > 0) {
      this.gameConfigService.deductFreePool(result.freePoolToDeduct);
    }

    if (result.isWinner && res.winStreakCount >= 5) {
      await this.userWinnerService.insertWinner({
        amount: result.prizeAmount,
        roundId: this.gameService.deckConfig.roundId,
        userId,
        userWinstreakCount: res.winStreakCount,
      });
    }

    this.mainSseService.sendUserStatsToClients({
      chips: res.chips,
      points: res.points,
      chipsLocked: false,
      pointsLocked: false,
      userId,
      winstreakCount: res.winStreakCount,
    });

    return { ...res, result };
  }

  @Post('lock-chips-bet')
  async lockChipsBet(@Body() { bets, userId }: BetParamModel) {
    const currentStats = await this.userStatsService.getStatsByUserId(userId);
    const currentBetChips = await this.userBetLockedService.currentChips(
      userId,
    );

    const totalBets = ArraySum(bets.map((i) => i.amount));
    const currentChips = currentStats.chips - (currentBetChips + totalBets);

    if (currentChips < 0) {
      throw new BadRequestException('Invalid amount');
    }

    await this.userBetLockedService.addChips(userId, bets);

    await this.commissionHistoryService.createHistory(userId, totalBets);
    await this.commissionService.proccessCommission(userId, totalBets);

    this.mainSseService.sendUserStatsToClients({
      ...this.userStatsHelperService.userStats,
      chips: currentChips,
      points: currentStats.points,
      userId,
      chipsLocked: true,
    });

    await this.potBonusService.supplyPotBonus(totalBets);

    const chipsBetTotal = await this.userBetLockedService.getTotalChipsBet();

    this.mainSseService.sendBetLockDataToClients(chipsBetTotal);

    return this.userStatsHelperService.userStats;
  }

  @Post('lock-points-bet')
  async lockPointsBet(@Body() { bets, userId }: BetParamModel) {
    const currentStats = await this.userStatsService.getStatsByUserId(userId);
    const currentBetPoints = await this.userBetLockedService.currentPoints(
      userId,
    );

    const totalBets = ArraySum(bets.map((i) => i.amount));
    const currentPoints = currentStats.points - (currentBetPoints + totalBets);

    if (currentPoints < 0) {
      throw new BadRequestException('Invalid amount');
    }

    await this.userBetLockedService.addPoints(userId, bets);

    this.mainSseService.sendUserStatsToClients({
      ...this.userStatsHelperService.userStats,
      points: currentPoints,
      chips: currentStats.chips,
      userId,
      pointsLocked: true,
    });

    return this.userStatsHelperService.userStats;
  }

  private async getBettingResults(
    bets: BetModel[],
    chipsBetsTotal: BetTotalModel = {},
    totalChipsDeal = 0,
    currentFreePool = 0,
  ): Promise<BettingResultModel[]> {
    const roundBetResult = this.gameService.roundBetResult;
    const betsTotal: { [key: number]: number } = {};

    const chipsBetTotal = await this.userBetLockedService.getTotalChipsBet();

    chipsBetTotal.forEach((bet) => {
      const typeKey = Number(bet.betType);
      const amount = Number(bet.totalAmount);

      betsTotal[typeKey] = amount;
    });

    const results = bets.map((bet) => {
      const betting = BettingBuilder(bet);
      const result = betting.generateResult(
        roundBetResult,
        chipsBetsTotal,
        totalChipsDeal,
        currentFreePool,
      );
      return result;
    });

    return results;
  }

  private getTotalBets(chipsBetTotal: UserBetLockedDto[]) {
    const betsTotal: { [key: number]: number } = {};

    for (const chipBetTotal of chipsBetTotal) {
      betsTotal[chipBetTotal.betType] = Number(chipBetTotal.totalAmount);
    }

    return betsTotal;
  }

  private async saveDealHistory(
    userId: string,
    result: BettingResultModel,
    type: MoneyTypeEnum,
  ) {
    const [inBetween, outBeyond, pair, trio] =
      await this.userBetLockedService.currentBetValues(userId, type);

    await this.dealHistoryService.inserHistory(
      {
        userId,
        inBetween,
        outBeyond,
        pair,
        trio,
        lostAmount: result.lostAmount,
        winAmount: result.prizeAmount,
        roundResult: this.gameService.deckConfig.betResult,
        dealNo: this.gameService.dealNumber,
      },
      type,
    );
  }
}
