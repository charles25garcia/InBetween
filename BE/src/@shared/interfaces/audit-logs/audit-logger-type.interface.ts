import { LogTypesEnum } from '@core/enums';
import { SuccessInterceptorContextModel } from '@shared/models';
import { Tbl_User } from 'src/app/user';

export interface AuditLoggerTypeInertface {
  title: string;
  type: LogTypesEnum;
  url: string;
  description(
    requestor: Tbl_User,
    context: SuccessInterceptorContextModel,
  ): Promise<string>;
  disabled?: boolean;
}
