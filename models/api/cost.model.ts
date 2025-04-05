import { ConsumableModel } from "./consumables.model";

export interface CostModel {
  id?: number;
  consumable: ConsumableModel;
  quantity: number;
}
