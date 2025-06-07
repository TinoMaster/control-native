import { BusinessModel } from "./business.model";
import { EmployeeModel } from "./employee.model";
import { ERole } from "./roles.model";

export interface UserModel {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: ERole;
  active: boolean;
  businessesOwned: BusinessModel[];
  businesses: BusinessModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRegisterModel {
  name: string;
  email: string;
  password: string;
  role: ERole;
  active: boolean;
  business: BusinessModel;
}

export interface RegisterOwnerModel {
  name: string;
  email: string;
  password: string;
  role: ERole;
  business: BusinessModel;
  employee: EmployeeModel;
}
