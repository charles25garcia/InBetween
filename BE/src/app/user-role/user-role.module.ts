import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_User_Role } from './tbl-user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_User_Role])],
})
export class UserRoleModule {}
