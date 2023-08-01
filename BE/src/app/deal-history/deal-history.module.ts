import { Module } from '@nestjs/common';
import { DealHistoryService } from './deal-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Deal_History } from './tbl-deal-history.entity';
import { DealHistoryController } from './deal-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Deal_History])],
  providers: [DealHistoryService],
  exports: [DealHistoryService],
  controllers: [DealHistoryController],
})
export class DealHistoryModule {}
