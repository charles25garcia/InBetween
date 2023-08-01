import { ValidationStatus } from "./ValidationStatus.model";

export type Rule = (value: string) => ValidationStatus;
