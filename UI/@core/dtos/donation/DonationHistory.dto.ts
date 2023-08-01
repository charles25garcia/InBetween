export interface DonationHistoryDto {
  donationFrom: {
    fullName: string;
  };
  donatedTo: {
    fullName: string;
  };
  points: number;
  chips: number;
  pointsBefore: number;
  chipsBefore: number;
  actualPoints: number;
  actualChips: number;
  dateTime: Date;
}
