import { Module, forwardRef } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Commission } from './tbl-commision.entity';
import { UserModule } from '../user';
import { CommissionHistoryModule } from '../commission-history';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tbl_Commission]),
    forwardRef(() => UserModule),
    CommissionHistoryModule,
  ],
  providers: [CommissionService],
  controllers: [CommissionController],
  exports: [CommissionService],
})
export class CommissionModule {}
