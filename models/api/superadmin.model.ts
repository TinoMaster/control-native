import { ERole } from "./roles.model";

export interface SuperAdminModel {
  name: string;
  email: string;
  password: string;
  role: ERole;
}
