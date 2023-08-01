import { Public, SkipAuditLogs } from '@core/decorators';
import { Controller, Param, Sse } from '@nestjs/common';

import { MainSseService } from '@shared/services';
@Controller('server-sent-events')
export class ServerSentEventsController {
  constructor(private mainSseService: MainSseService) {}

  @Sse('main-sse/:userId')
  @SkipAuditLogs()
  @Public()
  mainSseListener(@Param() { userId }) {
    return this.mainSseService.listenToMainSse(userId);
  }
}
