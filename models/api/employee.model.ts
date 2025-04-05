import { AddressModel } from "./address.model";
import { UserModel } from "./user.model";

export interface EmployeeModel {
    id: string;
    phone: string;
    address: AddressModel;
    user: UserModel;
    dni: string;
    percentSalary: number;
    fixedSalary: number;
}