import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestSuccessHandlerInterceptor } from './interceptors';
import { UserModule } from 'src/app/user';
import { AuthGuard } from './guards';
import { AuditLogsModule } from 'src/app/audit-logs';
import { AuditLogger } from './logger';

@Module({
  imports: [AuditLogsModule, forwardRef(() => UserModule)],
  providers: [
    AuditLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestSuccessHandlerInterceptor,
    },
    // Guards
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuditLogger],
})
export class CoreModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer.apply(TestMiddelware).forRoutes('*');
  //   }
}
