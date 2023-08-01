import { WinstreakBonusDto } from "./WinstreakBonus.dto";

export interface WinstreakBonusSseDto {
  winstreakBonuses: WinstreakBonusDto[];
  numberOfWinners?: number;
}
