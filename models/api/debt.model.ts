import { EmployeeModel } from "./employee.model";

export interface DebtModel {
  id?: number;
  name: string;
  description?: string;
  total: number;
  paid: number;
  business: number;
  employee: EmployeeModel;
  businessFinalSale?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
