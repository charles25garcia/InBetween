import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Audit_Logs } from './tbl-audit-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Audit_Logs])],
  providers: [AuditLogsService],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}
