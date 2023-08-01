import { FieldClassModel, FormModel } from "..";

export interface InputProfileModel extends FormModel {
  accountName: FieldClassModel;
  email: FieldClassModel;
  contactNo: FieldClassModel;
  username: FieldClassModel;
}
