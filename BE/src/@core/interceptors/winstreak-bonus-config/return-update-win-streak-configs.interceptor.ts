import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, mergeMap, of } from 'rxjs';
import { WinstreakBonusConfigService } from 'src/app/winstreak-bonus-config';

export class ReturnUpdateWinStreakConfigsInterceptor
  implements NestInterceptor
{
  constructor(
    private dto: any,
    private winstreakBonusConfigService: WinstreakBonusConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      mergeMap(async () => {
        return of(await this.winstreakBonusConfigService.getWinstreakBonuses());
      }),
    );
  }
}
