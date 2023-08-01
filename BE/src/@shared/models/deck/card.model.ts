import { CardLabelEnum, CardTypeEnum } from '@shared/enums';

export interface CardModel {
  id: number;
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  label: CardLabelEnum;
  type: CardTypeEnum;
  img: string;
}
