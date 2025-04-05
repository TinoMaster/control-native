import { ERole } from "./roles.model";

interface TokenModel {
  token: string;
}

export interface AuthDataModel {
  email: string;
  password: string;
}

export interface LoginResponseModel extends TokenModel {
  refreshToken: string;
  role: ERole;
}
export interface AuthModel extends TokenModel {
  username?: string;
}
