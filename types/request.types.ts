import { ERole } from "models/api";

export interface IResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface IRegisterOwnerResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: string;
  role: ERole;
  active: boolean;
}
