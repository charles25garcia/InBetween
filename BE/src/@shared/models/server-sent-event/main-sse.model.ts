import { SseTypeEnum } from '@shared/enums';

export interface MainSseModel {
  type: SseTypeEnum;
  filteredByUserId?: boolean;
  userId?: string;
  data: any;
  // delaySec: number;
}
