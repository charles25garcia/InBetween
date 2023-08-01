import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/app/user';

@Injectable()
export class AdminPasswordGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { adminPassword } = context.switchToHttp().getRequest().body;

    if (!(await this.userService.adminUser.matchPassword(adminPassword))) {
      throw new HttpException('Invalid Account', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
