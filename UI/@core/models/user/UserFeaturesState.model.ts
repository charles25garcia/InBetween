export interface UserFeaturesStateModel {
    id: number;
    featureName: string;
    featurePage: string;
    isActive: boolean;
    parentFeatureId: number;
    level: number;
    icon: string;
    features: UserFeaturesStateModel[];
  }
  