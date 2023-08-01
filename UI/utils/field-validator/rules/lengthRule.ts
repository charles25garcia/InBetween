import { Rule, ValidationStatus } from "~/@shared/models";

export function lengthRule({ min, max }: { min: number; max: number }): Rule {
    return function (value: string): ValidationStatus {
      const result = Boolean(value.length >= min && value.length <= max);
      return {
        valid: result,
        message: result
          ? ""
          : `This field must be between ${min} and ${max}`,
      };
    };
  }
  