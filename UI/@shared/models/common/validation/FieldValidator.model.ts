import { Rule } from "./Rule.model";
import { ValidationStatus } from "./ValidationStatus.model";

export interface FieldValidatorModel {
  validate(value: string, rules: Rule[]): ValidationStatus;
}
