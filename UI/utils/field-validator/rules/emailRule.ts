import { Rule } from "~/@shared/models";

export const emailRule: Rule = (value: string) => {
  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const valid = expression.test(value);

  return {
    valid,
    message: valid ? "" : "Invalid Email",
  };
};
