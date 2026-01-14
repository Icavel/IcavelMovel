// src/typeAdapter.ts
import { TruckModel as CentralTruckModel } from './types';

export const adaptToCentralModel = (selectorModel: any): CentralTruckModel => {
  return {
    id: String(selectorModel.id),
    name: selectorModel.name,
    type: selectorModel.type,
    variant: selectorModel.variant,
    price: selectorModel.price,
    image: selectorModel.image || selectorModel.imageUrl,
    imageUrl: selectorModel.imageUrl || selectorModel.image,
    description: selectorModel.description,
    features: selectorModel.features,
    specs: selectorModel.specs,
    transmission: selectorModel.transmission,
    engine: selectorModel.engine,
    power: selectorModel.power,
    torque: selectorModel.torque,
    capacity: selectorModel.capacity,
    weight: selectorModel.weight
  };
};

export const adaptToSelectorModel = (centralModel: CentralTruckModel): any => {
  return {
    ...centralModel,
    id: String(centralModel.id),
    imageUrl: centralModel.imageUrl || centralModel.image
  };
};