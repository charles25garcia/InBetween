export interface CommissionDto {
  id: number;
  userId: string;
  amount: number;
  lastUpdated: Date;
  user: {
    fullName: string;
  };
}
