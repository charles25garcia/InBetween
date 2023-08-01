import { Injectable } from '@nestjs/common';

import { Tbl_User_Winner, UserWinnerService } from 'src/app/user-winner';
import { DeckConfigHelperService } from './deck-config-helper.service';
import { UserStatsService } from 'src/app/user-stats';
import { WinstreakBonusConfigService } from 'src/app/winstreak-bonus-config';
import { DeckConfigModel } from '@shared/models';
import { BonusHelper } from '@shared/utils';
import { MainSseService } from '../server-sent-event/main-sse.service';

@Injectable()
export class PotBonusService {
  constructor(
    private deckConfigHelperService: DeckConfigHelperService,
    private userStatsService: UserStatsService,
    private winstreakBonusConfigService: WinstreakBonusConfigService,
    private userWinnerService: UserWinnerService,
    private mainSseService: MainSseService,
  ) {}

  async applyBonus(deck: DeckConfigModel) {
    const winnerUsers = await this.userWinnerService.getCurrentWinners(
      deck.roundId,
    );
    // console.log(winnerUsers, deck.roundId);
    if (winnerUsers.length < 1) {
      return;
    }

    await this.applyBonusForEachWinner(winnerUsers);

    const winstreakBonuses = await this.winstreakBonusConfigService.getAll();

    this.deckConfigHelperService.setWinstreakBonuses(
      winstreakBonuses,
      winnerUsers.length,
    );
    this.mainSseService.sendPotBonusToClients(
      winstreakBonuses,
      winnerUsers.length,
    );
  }

  getBetPotAmount(betAmount: number): number {
    return BonusHelper.getBetPotAmount(
      betAmount,
      this.deckConfigHelperService.allocationPercent,
      this.deckConfigHelperService.potBonusPercent,
    );
  }

  async supplyPotBonus(amount: number) {
    const potAmount = this.getBetPotAmount(amount);

    const winstreakBonuses = await this.winstreakBonusConfigService.addPotBonus(
      potAmount,
    );

    this.deckConfigHelperService.setWinstreakBonuses(winstreakBonuses);
    this.mainSseService.sendPotBonusToClients(winstreakBonuses);
  }

  private async applyBonusForEachWinner(winnerUsers: Tbl_User_Winner[]) {
    const winStreakTobeReset: number[] = [];

    for (let index = 0; index < winnerUsers.length; index++) {
      const winnerUser = winnerUsers[index];
      const bonusCategories =
        this.deckConfigHelperService.winstreakBonuses.winstreakBonuses.filter(
          (i) => i.winStreak <= winnerUser.userWinstreakCount,
        );

      const bonusCategory = bonusCategories[bonusCategories.length - 1];

      const winnerBonus = bonusCategory.potBonusAmount / winnerUsers.length;

      const user = await this.userStatsService.addChips(
        winnerUser.userId,
        winnerBonus,
      );

      this.mainSseService.sendUserStatsToClients({
        chips: user.chips,
        chipsLocked: false,
        pointsLocked: false,
        points: user.points,
        userId: user.userId,
      });

      if (!winStreakTobeReset.includes(bonusCategory.winStreak)) {
        winStreakTobeReset.push(bonusCategory.winStreak);
      }
    }

    await this.winstreakBonusConfigService.resetPotBonuses(winStreakTobeReset);
  }
}
