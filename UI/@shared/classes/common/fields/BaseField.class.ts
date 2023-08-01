import { FieldTypeEnum } from "~/@shared/enums";
import {
  FieldClassModel,
  FieldParamModel,
  Rule,
  ValidationStatus,
} from "~/@shared/models";

export abstract class BaseFieldClass implements FieldClassModel {
  private rules: Rule[] = [];
  protected additionalRules: Rule[];

  displayName: string;
  placeholder: string;
  type: FieldTypeEnum;
  value: globalThis.Ref<any>;
  required: boolean;
  state: globalThis.Ref<ValidationStatus>;
  id: string;
  disabled: boolean;
  max: number | undefined;
  maxLength: number | undefined;

  constructor({
    displayName,
    placeholder,
    type,
    value,
    required,
    disabled,
    id,
    max,
    maxLength
  }: FieldParamModel) {
    this.id = id ? id : Camelize(displayName.trim());
    this.displayName = displayName;
    this.placeholder = placeholder || "";
    this.type = type as FieldTypeEnum;
    this.state = ref({
      valid: true,
      message: "",
    });
    this.value = value ? ref<typeof value>(value) : ref("");
    this.required = required || false;
    this.disabled = disabled || false;
    this.additionalRules = [];
    this.max = max;
    this.maxLength = maxLength;
  }
  setValue(value: any): any {
    this.value.value = value;
    return this.value.value;
  }

  getValue(): any {
    return this.value.value;
  }

  clear(): void {
    this.value.value = "";
    this.state.value = {
      valid: true,
      message: "",
    };
  }

  validate(): ValidationStatus {
    const res = validate(this.value.value, [
      ...this.rules,
      ...this.additionalRules,
      ...(this.required ? [requiredRule] : []),
    ]);
    this.state.value = res;
    return res;
  }
}
