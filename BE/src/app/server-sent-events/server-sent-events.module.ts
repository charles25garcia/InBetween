import { Module } from '@nestjs/common';
import { ServerSentEventsController } from './server-sent-events.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ServerSentEventsController],
})
export class ServerSentEventsModule {}
