import { MachineModel } from "./machine.model";

export interface MachineStateModel {
  id?: number;
  businessFinalSaleId?: number;
  machine: MachineModel;
  fund: number;
  date: Date;
}
