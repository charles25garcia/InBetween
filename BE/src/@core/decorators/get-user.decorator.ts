import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Tbl_User } from '../../app/user/';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Tbl_User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
