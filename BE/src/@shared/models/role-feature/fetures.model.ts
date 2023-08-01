export interface FeaturesModel {
  id: number;
  featureName: string;
  featurePage: string;
  isActive: boolean;
  parentFeatureId: number;
  level: number;
  features: FeaturesModel[];
}
