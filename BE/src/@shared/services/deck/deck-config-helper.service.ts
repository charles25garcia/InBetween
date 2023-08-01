import { DeckConfigService } from 'src/app/deck-config';
import { WinstreakBonusConfigService } from 'src/app/winstreak-bonus-config';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { WinstreakBonusDto, WinstreakBonusSseDto } from '@core/dtos';
@Injectable()
export class DeckConfigHelperService {
  private readonly _winstreakBonuses =
    new BehaviorSubject<WinstreakBonusSseDto>({
      winstreakBonuses: [],
    });
  private readonly _updateUiMessenger = new BehaviorSubject<number>(0);

  readonly winstreakBonuses$ = this._winstreakBonuses.asObservable();
  readonly updateUiMessenger$ = this._updateUiMessenger.asObservable();

  allocationPercent: number;
  potBonusPercent: number;

  get winstreakBonuses(): WinstreakBonusSseDto {
    return this._winstreakBonuses.getValue();
  }
  set winstreakBonuses(value: WinstreakBonusSseDto) {
    this._winstreakBonuses.next({
      ...value,
      winstreakBonuses: value.winstreakBonuses.map((i) => ({
        id: i.id,
        winStreak: i.winStreak,
        bonusPercent: i.bonusPercent,
        potBonusAmount: Math.round(i.potBonusAmount),
      })),
    });
  }

  constructor(
    private deckConfigService: DeckConfigService,
    private winstreakBonusConfigService: WinstreakBonusConfigService,
  ) {
    this.init();
  }

  updateUiMessenger() {
    this._updateUiMessenger.next(this._updateUiMessenger.getValue() + 1);
  }

  private async init() {
    const { allocationPercent, potBonusPercent } =
      await this.deckConfigService.getConfig();

    this.allocationPercent = allocationPercent;
    this.potBonusPercent = potBonusPercent;

    await this.refreshWinstreakData();
  }

  async refreshWinstreakData() {
    const winstreakBonuses = await this.winstreakBonusConfigService.getAll();

    this.winstreakBonuses = {
      winstreakBonuses,
      numberOfWinners: 0,
    };

    return this.winstreakBonuses;
  }

  async getCurrentPotBonusFromDB() {
    const winstreakBonuses = await this.winstreakBonusConfigService.getAll();

    this.winstreakBonuses = {
      winstreakBonuses,
      numberOfWinners: 0,
    };

    return this.winstreakBonuses;
  }

  setWinstreakBonuses(
    winstreakBonuses: WinstreakBonusDto[],
    numberOfWinners = 0,
  ) {
    this.winstreakBonuses = {
      winstreakBonuses,
      numberOfWinners,
    };
  }
}
