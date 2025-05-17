import { EUnit } from "./unit.model";

export interface ConsumableKeyModel {
  id: string;
  createdAt: Date;
}

export interface ConsumableModel {
  id?: number;
  consumableKey?: ConsumableKeyModel;
  name: string;
  description: string;
  price: number;
  unit: EUnit;
  stock: number;
  business: number;
  createdAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date;
}
