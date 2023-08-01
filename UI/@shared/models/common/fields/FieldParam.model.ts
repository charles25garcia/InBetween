import { Rule } from "../validation/Rule.model";

export interface FieldParamModel {
  displayName: string;
  placeholder?: string;
  type: 'text' | 'number' | 'checkbox' | 'email' | 'password';
  value?: any;
  required?: boolean;
  rules?: Rule[];
  id?: string;
  max?: number;
  maxLength?: number;
  disabled?: boolean;
}
