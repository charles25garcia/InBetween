import { FieldClassModel, FormModel } from "..";

export interface ChangePasswordModel extends FormModel {
  currentPassword: FieldClassModel;
  confirmPassword: FieldClassModel;
  newPassword: FieldClassModel;
}
