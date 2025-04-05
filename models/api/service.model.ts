import { CostModel } from "./cost.model";

export interface ServiceModel {
  id?: number;
  name: string;
  description: string;
  price: number;
  business: number;
  costs: CostModel[];
  createdAt?: Date;
  updatedAt?: Date;
}
