import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { UserRoleEnum } from '@core/enums';

@Injectable()
export class SilverNotAllowedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      if (
        !request.user?.userRole?.id ||
        request.user.userRole.id === UserRoleEnum.SILVER
      ) {
        throw new HttpException('Invalid Account', HttpStatus.UNAUTHORIZED);
      }

      return true;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
