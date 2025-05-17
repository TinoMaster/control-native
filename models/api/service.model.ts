import { CostModel } from "./cost.model";

export interface ServiceKeyModel {
  id: string;
  createdAt: Date;
}

export interface ServiceModel {
  id?: number;
  serviceKey?: ServiceKeyModel;
  name: string;
  description: string;
  price: number;
  business: number;
  costs: CostModel[];
  createdAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date;
}
