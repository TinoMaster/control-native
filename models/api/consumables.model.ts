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
  unit: string;
  stock: number;
  business: number;
  createdAt?: Date;
  updatedAt?: Date;
  finishedAt?: Date;
}
