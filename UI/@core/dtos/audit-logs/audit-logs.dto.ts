import { LogTypesEnum } from "~/@core/enums";

export interface AuditLogsDto {
    id: number;
    userId: string;
    title: string;
    description: string;
    loggerDateTime: string;
    type: LogTypesEnum;
    user: { fullName: string }
}