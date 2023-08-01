import { AuditLogsDto } from '@core/dtos';
import { ConsoleLogger, Injectable } from '@nestjs/common';

import { AuditLogsService } from 'src/app/audit-logs';

@Injectable()
export class AuditLogger extends ConsoleLogger {
  constructor(private autditLogsService: AuditLogsService) {
    super();
  }

  logAudit(logsInfo: AuditLogsDto) {
    try {
      this.autditLogsService.insertLogs(logsInfo);
    } catch (e) {
      this.error(e);
    }
  }

  private customLog(description: string) {
    super.log(`${new Date()} ${super.context}: ${description}`);
  }
}
