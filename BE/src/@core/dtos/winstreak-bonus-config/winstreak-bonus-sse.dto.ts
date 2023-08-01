import { WinstreakBonusDto } from './winstreak-bonus.dto';

export interface WinstreakBonusSseDto {
  winstreakBonuses: WinstreakBonusDto[];
  numberOfWinners?: number;
}
