import { BetTypeEnum } from '@core/enums';
import { Expose } from 'class-transformer';

export class CurrentBetLockedDto {
  @Expose()
  user: {
    fullName: string;
  };

  @Expose()
  chips: number;

  @Expose()
  points: number;

  @Expose()
  betType: BetTypeEnum;
}
