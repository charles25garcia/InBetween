import { Module } from '@nestjs/common';

// Services
import { PermissionService } from './permission.service';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Tbl_Permission } from './tbl-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Permission])],
  controllers: [],
  providers: [PermissionService],
})
export class PermissionModule {}
