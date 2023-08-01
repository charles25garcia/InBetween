import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWinnerService } from './user-winner.service';
import { Tbl_User_Winner } from './tbl-user-winner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_User_Winner])],
  providers: [UserWinnerService],
  exports: [UserWinnerService],
})
export class UserWinnerModule {}
