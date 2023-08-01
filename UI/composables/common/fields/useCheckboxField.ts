import { CheckboxFieldClass } from "~/@shared/classes";
import { CheckboxParamModel } from "~/@shared/models";

export function useCheckboxField(checkboxData: CheckboxParamModel): CheckboxFieldClass {
    return new CheckboxFieldClass(checkboxData)
}