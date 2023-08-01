import { InputFieldClass } from "~/@shared/classes";
import { FieldParamModel } from "~/@shared/models";

export function useInputField(inputData: FieldParamModel): InputFieldClass {
  return new InputFieldClass(inputData);
}
