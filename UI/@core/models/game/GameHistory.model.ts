export interface GameHistoryModel {
  data: [
    {
      id: number;
      winning_bet: string;
      first_card: string;
      middle_card: string;
      last_card: string;
    }
  ];
}
