import { LogTypesEnum, WithdrawalTypeEnum } from '@core/enums';
import { AuditLoggerTypeInertface } from '@shared/interfaces';
import { SuccessInterceptorContextModel } from '@shared/models';
import { CamelCaseToTitle } from '@shared/utils/string-helper/camel-case-to-title';

export const AuditLoggerConfigConst: AuditLoggerTypeInertface[] = [
  {
    title: 'Transfer Chips',
    type: LogTypesEnum.TransferChips,
    url: '/admin-user/add-stats',
    async description(
      requestor,
      { userService, responseData, body }: SuccessInterceptorContextModel,
    ) {
      const donatedTo = await userService.getUserByUserId(body.userId);

      const description = `${requestor.fullName} donated ${
        body.chips || 0
      } chips and ${body.points} points to ${donatedTo.fullName}.\n${
        donatedTo.fullName
      }'s current stats: \nChips = ${responseData?.chips || 0}\nPoints = ${
        responseData?.points || 0
      }`;

      return description;
    },
  },
  {
    title: 'Profile Modification',
    type: LogTypesEnum.ProfileModification,
    url: '/user/updateprofile/:id',
    async description(requestor, { body }: SuccessInterceptorContextModel) {
      let updatedField = '';

      Object.keys(body).forEach((i) => {
        if (body[i] !== requestor[i]) {
          updatedField += ` ${CamelCaseToTitle(i)} from '${requestor[i]}' to '${
            body[i]
          }',`;
        }
      });

      const description = `${requestor.fullName} updates: ${updatedField}`;
      return description;
    },
  },
  {
    title: 'Admin Manual Withdrawal',
    type: LogTypesEnum.ManualWithdrawal,
    url: '/admin-user/manual-withdrawal',
    async description(
      requestor,
      { body, userService, responseData }: SuccessInterceptorContextModel,
    ) {
      const user = await userService.getUserById(body.userId);

      return `${requestor.fullName} manually withdrew ${body.chips} chips and ${body.commissionAmount} commission for ${user.fullName}. 
      ${user.fullName}'s current chips: ${responseData.chips} and commission: ${responseData.commissionAmount}`;
    },
  },
  {
    title: 'Approve Withdrawal Request',
    type: LogTypesEnum.ApproveWithdrawal,
    url: '/admin-user/approve-withdrawal-request',
    async description(
      requestor,
      { responseData }: SuccessInterceptorContextModel,
    ) {
      return `${responseData.user.fullName}'s ${responseData.amount} ${
        responseData.type === WithdrawalTypeEnum.CHIPS ? 'chips' : 'commission'
      } withdrawal request was approved by ${requestor.fullName}`;
    },
  },
  {
    title: 'Approve Withdrawal Request',
    type: LogTypesEnum.DeclineWithdrawal,
    url: '/admin-user/decline-withdrawal-request/:type',
    async description(
      requestor,
      { responseData }: SuccessInterceptorContextModel,
    ) {
      return `${responseData.user.fullName}'s ${responseData.amount} ${
        responseData.type === WithdrawalTypeEnum.CHIPS ? 'chips' : 'commission'
      } withdrawal request was declined by ${requestor.fullName}`;
    },
  },
];
