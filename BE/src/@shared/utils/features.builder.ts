import { FeaturesModel } from '@shared/models';
import { Tbl_Feature } from 'src/app/feature';

export const featuresBuilder = (
  features: Tbl_Feature[],
  level = 0,
): FeaturesModel[] => {
  const parentFeatures = features.filter((f) => f.level === level);

  const _features = [...mapper(parentFeatures)];

  _features.forEach((pf, index) => {
    const childs = features.filter((i) => i.parentFeatureId === pf.id);
    _features[index].features = featuresBuilder(childs, level + 1);
  });

  return _features;
};

function mapper(features: Tbl_Feature[]): FeaturesModel[] {
  return features.map((feature) => {
    delete feature['roleFeatures'];
    return {
      ...feature,
      features: [],
    } as FeaturesModel;
  });
}
