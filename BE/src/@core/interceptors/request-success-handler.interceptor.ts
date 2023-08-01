import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  forwardRef,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { ResponseDto } from '@core/dtos';
import { AuditLogger } from '@core/logger';
import { UserService } from 'src/app/user';
import { AuditLoggerConfigConst } from '@shared/constants';
import { Reflector } from '@nestjs/core';
import { AuditLoggerTypeInertface } from '@shared/interfaces';

@Injectable()
export class RequestSuccessHandlerInterceptor implements NestInterceptor {
  constructor(
    private auditLogger: AuditLogger,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    next.handle().subscribe;
    const isSkippedAuditLogs = this.reflector.get<boolean>(
      'skit-audit-logs',
      context.getHandler(),
    );

    if (isSkippedAuditLogs) {
      return next.handle().pipe(
        map(
          (data: any) =>
            ({
              data,
              success: true,
              message: 'Successful',
            } as ResponseDto),
        ),
      );
    }

    const [incomingMessage] = context.getArgs();

    const authLogger = AuditLoggerConfigConst.find(
      (i) => i.url === incomingMessage.route.path,
    );

    return next.handle().pipe(
      map(async (data: any) => {
        if (authLogger) {
          const requestorUser = context.switchToHttp().getRequest().user;
          await this.auditLogs(
            data,
            requestorUser,
            authLogger,
            incomingMessage,
          );
        }
        return {
          data,
          success: true,
          message: 'Successful',
        } as ResponseDto;
      }),
    );
  }

  private async auditLogs(
    data: any,
    requestorUser: any,
    authLogger: AuditLoggerTypeInertface,
    incomingMessage: any,
  ) {
    const description = await authLogger?.description(requestorUser, {
      responseData: data,
      body: incomingMessage.body,
      param: incomingMessage.param,
      userService: this.userService,
    });

    this.auditLogger.logAudit({
      description,
      title: authLogger.title,
      type: authLogger.type,
      userId: requestorUser.id,
    });
  }
}
