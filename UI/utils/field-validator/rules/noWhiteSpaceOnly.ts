import { Rule, ValidationStatus } from "~/@shared/models";

export const noWhiteSpaceOnly: Rule = (value: string): ValidationStatus => {
  if (value.includes(" ")) {
    const valid = value.trim().length > 0;
    return {
      valid,
      message: valid ? "" : "No white space only",
    };
  }

  return {
    valid: true,
    message: "",
  };
};
