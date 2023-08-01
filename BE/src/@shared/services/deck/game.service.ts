import { Injectable } from '@nestjs/common';
import { BehaviorSubject, interval, map, mergeMap, pairwise, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { DeckModeService, Tbl_Deck_Mode } from 'src/app/deck-mode';

import { DeckModeEnum, SseTypeEnum } from '@shared/enums';

import { DeckConfigModel } from '@shared/models';
import { DeckConfigHelperService } from './deck-config-helper.service';
import { DeckClass } from '@shared/classes';
import { MainSseService } from '../server-sent-event/main-sse.service';
import { MiliToSec } from '@shared/utils';
import { PotBonusService } from './pot-bonus.service';
import { UserBetLockedService } from 'src/app/user-bet-locked';
import { GameHistoryService } from 'src/app/game-history';
import { HistoryDto } from '@core/dtos/game-history/history.dto';
import { BetTypeEnum } from '@core/enums';

@Injectable()
export class GameService extends DeckClass {
  private readonly deckConfigInitValue = {
    cardsOnDeck: [],
    mode: DeckModeEnum.Shuffle,
    timer: 5000,
    cardIndexes: '',
    roundId: uuidv4(),
    dealNumber: 1,
    date: new Date().toISOString().split('T')[0],
  };
  private readonly _deckConfig = new BehaviorSubject<DeckConfigModel>(
    this.deckConfigInitValue,
  );

  private _dealNumber = 1;
  public get dealNumber(): number {
    return this._dealNumber;
  }
  private set dealNumber(value: number) {
    this._dealNumber = value;
  }

  private _deckStep = 0;
  private get deckStep(): number {
    return this._deckStep;
  }
  private set deckStep(value: number) {
    this._deckStep = value;
  }

  private get currentMode(): Tbl_Deck_Mode {
    return this.deckModes[this.deckStep];
  }
  private get modeCount(): number {
    return this.deckModes.length;
  }

  get deckConfig(): DeckConfigModel {
    return this._deckConfig.getValue();
  }
  set deckConfig(config: DeckConfigModel) {
    this._deckConfig.next(config);
  }

  readonly deckConfigUI$ = this._deckConfig
    .asObservable()
    .pipe(map((deck) => this.deckConfigUIMapper(deck)));

  deckModes: Tbl_Deck_Mode[];

  constructor(
    private deckConfigHelperService: DeckConfigHelperService,
    private mainSseService: MainSseService,
    private potBonusService: PotBonusService,
    private userBetLockedService: UserBetLockedService,
    private deckModeService: DeckModeService,
    private gameHistoryService: GameHistoryService,
  ) {
    super();
  }

  async lifeCycleProccess() {
    this.deckConfigUI$
      .pipe(pairwise())
      .subscribe(async ([prevDeck, currDeck]) => {
        switch (currDeck.mode) {
          case DeckModeEnum.Shuffle:
            await this.potBonusService.applyBonus(prevDeck as any);

            break;
          case DeckModeEnum.DealOpen:
            // Reset all bets in db
            await this.userBetLockedService.resetBet();

            this.deckConfigHelperService.refreshWinstreakData();
            this.mainSseService.sendPotBonusToClients(
              this.deckConfigHelperService.winstreakBonuses.winstreakBonuses,
            );

            break;
          case DeckModeEnum.Result:
            const [first, middle, third] = this.cardsOnDeck;

            const result: HistoryDto = {
              winning_bet: BetTypeEnum[this.roundBetResult].toUpperCase(),
              first_card: `${first.value.toString()} - ${first.type.toString()}`,
              middle_card: `${middle.value.toString()} - ${middle.type.toString()}`,
              last_card: `${third.value.toString()} - ${third.type.toString()}`,
              dealNumber: this.dealNumber,
            };

            await this.gameHistoryService.addGameHistory(result);

            this.mainSseService.sendGameHistoryToClient(
              await this.gameHistoryService.getHistories(),
            );
            break;
          default:
            break;
        }
      });

    this.startDeckIteration();

    const deckModes = await this.deckModeService.getAll();

    this.deckModes = deckModes;

    this.mainSseService.startMainSse();
    this.mainSseService.sendDataToClients({
      data: this.deckConfigInitValue,
      type: SseTypeEnum.Deck,
    });
  }

  start() {
    this.mainSseService.startMainSse();
  }

  stop() {
    this.userBetLockedService.resetBet();
    this.mainSseService.stopMainSse();
    this.deckStep = 0;
    this.deckConfig = this.deckConfigInitValue;
    this.cardsOnDeck = [];
  }

  private startDeckIteration() {
    this.mainSseService
      .listenToMainSseByTypes(SseTypeEnum.Deck)
      .pipe(
        mergeMap(() => {
          const numbers = interval(1000);
          const sec = MiliToSec(this.currentMode.timer);
          return numbers.pipe(take(sec + 2));
        }),
      )
      .subscribe((sec) => {
        const currDeckTimer = MiliToSec(this.currentMode.timer);

        if (currDeckTimer < sec) {
          this.deckIterationProccess(this.deckConfig);
        } else {
          this.mainSseService.sendCountDownToClient(currDeckTimer - sec);
        }
      });
  }

  private deckIterationProccess(currDeck: DeckConfigModel) {
    if (this.modeCount > this.deckStep + 1) {
      this.deckStep = this.deckStep + 1;
    } else {
      this.deckStep = 0;
    }

    const roundId =
      currDeck.mode === DeckModeEnum.Result ? uuidv4() : currDeck.roundId;

    const currentDate = new Date().toISOString().split('T')[0];

    if (currDeck.date === currentDate) {
      this.dealNumber =
        currDeck.mode === DeckModeEnum.Result
          ? currDeck.dealNumber + 1
          : currDeck.dealNumber;
    } else {
      this.dealNumber = 1;
    }
    if (currDeck.mode === DeckModeEnum.DealOpen) {
      this.shuffleCardsV2();
    }

    const nextDeckData: DeckConfigModel = this.deckConfigUIMapper({
      cardIndexes: this.currentMode.cardIndexes,
      mode: this.currentMode.mode,
      timer: this.currentMode.timer,
      cardsOnDeck: this.cardsOnDeck,
      betResult:
        this.currentMode.mode === DeckModeEnum.Result
          ? this.roundBetResult
          : undefined,
      roundId,
      dealNumber: this.dealNumber,
      date: currentDate,
    });

    this.mainSseService.sendDeckDataToClient(nextDeckData);
    this.deckConfig = nextDeckData;
  }

  private deckConfigUIMapper(deck: DeckConfigModel) {
    const strCardIndexes = deck.cardIndexes;

    if (!strCardIndexes) {
      return {
        ...deck,
        cardsOnDeck: [],
      };
    }

    if (strCardIndexes === '*') {
      return deck;
    }

    const cardIndexs = strCardIndexes.split(',').map((i) => +i);

    const cardsOnDeck = deck.cardsOnDeck.map((card, index) =>
      cardIndexs.includes(index) ? card : undefined,
    );

    return {
      ...deck,
      cardsOnDeck,
    };
  }
}
