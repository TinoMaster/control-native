import { EmployeeModel } from "./employee.model";
import { ServiceModel } from "./service.model";

export interface ServiceSaleModel {
  id?: number;
  quantity: number;
  service: ServiceModel;
  employee: EmployeeModel;
  business: number;
  businessFinalSale?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
