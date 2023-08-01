import { Rule, ValidationStatus } from "~/@shared/models";

export function validate(value: string, rules: Rule[]): ValidationStatus {
  for (const rule of rules) {
    const result = rule(value.toString());

    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
    message: "",
  };
}
