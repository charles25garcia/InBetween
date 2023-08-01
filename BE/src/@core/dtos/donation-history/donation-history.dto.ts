import { Expose } from 'class-transformer';

export class DonationHistoryDto {
  @Expose()
  donationFrom: {
    fullName: string;
  };

  @Expose()
  donatedTo: {
    fullName: string;
  };

  @Expose()
  chips: number;

  @Expose()
  points: number;

  @Expose()
  pointsBefore: number;

  @Expose()
  chipsBefore: number;

  @Expose()
  actualPoints: number;

  @Expose()
  actualChips: number;

  @Expose()
  dateTime?: Date;
}
