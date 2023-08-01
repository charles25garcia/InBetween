import { FieldTypeEnum } from "~/@shared/enums";
import { FieldParamModel, Rule, ValidationStatus } from "~/@shared/models";
import { BaseFieldClass } from "../BaseField.class";

export class InputFieldClass extends BaseFieldClass {
  protected additionalRules: Rule[] = [noWhiteSpaceOnly];

  constructor(data: FieldParamModel) {
    super(data);
  }

  validate(): ValidationStatus {
    if (
      this.type === FieldTypeEnum.Email &&
      !this.additionalRules.find((i) => i.name === emailRule.name)
    ) {
      this.additionalRules.push(emailRule);
    }
    return super.validate();
  }
}
