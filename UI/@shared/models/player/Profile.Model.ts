import { CommissionModel } from "../withdrawal/Commission.model";

export interface ProfileModel {
  id: string;
  referralId: string;
  fullName: string;
  email: string;
  contactNo: string;
  username: string;
  referralById: string;
  showMechanics: boolean;
  userRole: {
    id: number;
    roleDescription: string;
    defaultFeatureId: number;
    defautlFeature: { featurePage: string };
  };
  userStats: {
    points: number;
    chips: number;
  };
  commission: CommissionModel;
}
