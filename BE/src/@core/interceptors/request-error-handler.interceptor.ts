import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { errorResponseConst } from '@shared/constants';
import { Observable, catchError } from 'rxjs';

export class RequestErrorHandlerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    next.handle().subscribe;
    return next.handle().pipe(
      catchError(() => {
        throw errorResponseConst;
      }),
    );
  }
}
