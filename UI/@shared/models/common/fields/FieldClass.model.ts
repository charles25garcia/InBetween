import { FieldTypeEnum } from "~/@shared/enums";
import { ValidationStatus } from "../validation/ValidationStatus.model";

export interface FieldClassModel {
  id: string;
  displayName: string;
  type: FieldTypeEnum;
  placeholder: string;
  state: globalThis.Ref<ValidationStatus>;
  value: globalThis.Ref<any>;
  max: number | undefined;
  maxLength?: number;
  required: boolean;
  disabled: boolean;
  validate(): ValidationStatus;
  clear(): void;
  getValue(): any;
  setValue(value: any): any;
}
