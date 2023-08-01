import { FieldClassModel, FormModel } from "..";

export interface SigninFormModel extends FormModel {
  username: FieldClassModel;
  password: FieldClassModel;
}
