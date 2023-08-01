import { SseTypeEnum } from "~/@shared/enums";

export interface MainSseInterface {
  setData(data: any): void;
  type: SseTypeEnum
}
