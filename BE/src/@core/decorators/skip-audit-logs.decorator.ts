import { SetMetadata } from '@nestjs/common';
export const SkipAuditLogs = () => SetMetadata('skit-audit-logs', true);
