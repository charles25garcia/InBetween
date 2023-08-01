export interface DonationHistoryModel {
  fromUserId: string;
  toUserId: string;
  points: number;
  chips: number;
  pointsBefore: number;
  chipsBefore: number;
  actualPoints: number;
  actualChips: number;
  dateTime?: Date;
}
