import { Rule, ValidationStatus } from "~/@shared/models";

export const requiredRule: Rule = (value: string): ValidationStatus => {
  const result = value.length > 0;

  return {
    valid: result,
    message: result ? "" : "This field is required",
  };
};
