import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@core/classes';
import { Tbl_Audit_Logs } from './tbl-audit-logs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogsDto } from '@core/dtos';

@Injectable()
export class AuditLogsService extends BaseRepo<Tbl_Audit_Logs> {
  constructor(
    @InjectRepository(Tbl_Audit_Logs)
    private auditLogsRepo: Repository<Tbl_Audit_Logs>,
  ) {
    super(auditLogsRepo);
  }

  insertLogs(logsInfo: AuditLogsDto) {
    const newLogs = {
      ...logsInfo,
      loggerDateTime: new Date(),
    };
    this.create(newLogs);
  }

  getLogs() {
    return this.auditLogsRepo.find({ relations: ['user'] });
  }
}
