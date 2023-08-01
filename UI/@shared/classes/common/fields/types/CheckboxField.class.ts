import { BaseFieldClass } from "../BaseField.class";
import { FieldTypeEnum } from "~/@shared/enums";
import { CheckboxParamModel } from "~/@shared/models";

export class CheckboxFieldClass extends BaseFieldClass {
  constructor(data: CheckboxParamModel) {
    super({
      ...data,
      value: data.checkboxValue,
      type: FieldTypeEnum.Checkbox,
    });

    this.value = ref(false);
  }

  clear(): void {
    this.state.value = {
      message: "",
      valid: true,
    };
    this.value.value = false;
  }
}
