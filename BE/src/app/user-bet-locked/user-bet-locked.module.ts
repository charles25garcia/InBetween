import { Module } from '@nestjs/common';
import { UserBetLockedService } from './user-bet-locked.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_User_Bet_Locked } from './tbl-user-bet-locked.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_User_Bet_Locked])],
  providers: [UserBetLockedService],
  exports: [UserBetLockedService],
})
export class UserBetLockedModule {}
