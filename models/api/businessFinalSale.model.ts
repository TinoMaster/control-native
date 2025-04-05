import { CardPayment } from "../../../pages/private/reports/business-report/store/businessReport.store";
import { CardModel } from "./card.model";
import { DebtModel } from "./debt.model";
import { EmployeeModel } from "./employee.model";
import { MachineModel } from "./machine.model";
import { ServiceSaleModel } from "./serviceSale.model";

export interface BusinessFinalSaleModelResponse {
  id?: number;
  name: string;
  business: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: MachineModel[];
  cards: CardModel[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessFinalSaleModel {
  id?: number;
  name: string;
  business: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: number[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessFinalSaleModelToCreate {
  name: string;
  business: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: MachineModel[];
  cards: CardModel[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const transformBusinessSaleToBusinessSaleResponse = (
  businessSale: BusinessFinalSaleModel,
  machines: MachineModel[],
  cards: CardPayment[]
): BusinessFinalSaleModelResponse => {
  return {
    ...businessSale,
    machines: machines.filter((m) =>
      businessSale.machines.includes(m.id!)
    ) as MachineModel[],
    cards: cards.map((card) => ({
      id: card.id,
      amount: card.amount,
      number: card.cardNumber,
    })),
  };
};
