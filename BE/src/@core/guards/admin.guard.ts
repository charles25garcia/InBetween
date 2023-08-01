import { UserGuardClass } from '@core/classes';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app/user';

@Injectable()
export class AdminGuard extends UserGuardClass implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    jwtService: JwtService,
    configService: ConfigService,
  ) {
    super(jwtService, configService);
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { username } = await this.getTokenPayload(token);

      if (
        this.userService.adminUser.username.toLowerCase() !==
        username.toLowerCase()
      ) {
        throw new HttpException('Invalid Account', HttpStatus.UNAUTHORIZED);
      }

      return true;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
