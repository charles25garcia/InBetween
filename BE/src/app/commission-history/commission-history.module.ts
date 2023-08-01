import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Commission_History } from './tbl-commission-history.entity';
import { CommissionHistoryService } from './commission-history.service';
import { UserModule } from '../user';
import { CommissionHistoryController } from './commission-history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tbl_Commission_History]),
    forwardRef(() => UserModule),
  ],
  providers: [CommissionHistoryService],
  exports: [CommissionHistoryService],
  controllers: [CommissionHistoryController],
})
export class CommissionHistoryModule {}
