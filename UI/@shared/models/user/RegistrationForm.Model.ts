import { FieldClassModel, FormModel } from "..";

export interface RegistrationFormModel extends FormModel {
  fullname: FieldClassModel;
  email: FieldClassModel;
  contactNo: FieldClassModel;
  username: FieldClassModel;
  password: FieldClassModel;
  confirmPassword: FieldClassModel;
  isAgreeWithConditions: FieldClassModel;
}
