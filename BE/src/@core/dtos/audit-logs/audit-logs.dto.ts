import { LogTypesEnum } from '@core/enums';

export interface AuditLogsDto {
  userId: string;
  title: string;
  description: string;
  type: LogTypesEnum;
}
