import { AddressModel } from "./address.model";
import { MachineModel } from "./machine.model";

export interface BusinessModel {
  id?: number;
  name: string;
  description: string;
  address: AddressModel;
  machines?: MachineModel[];
  users?: number[];
  owner?: number;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
