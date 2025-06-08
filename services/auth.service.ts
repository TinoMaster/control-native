import { registerFormToRegisterOwnerMapper } from "mappers/global.mapper";
import { TLoginSchema } from "features-auth/login/schemas/login.schema";
import { TRegisterOwnerDataModel } from "models/zod/owner.schema";
import { apiConfig } from "../config/api.config";
import { ILoginResponse, IRegisterOwnerResponse, IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";

class AuthService {
  private readonly urlBase = `${apiConfig.baseUrl}/public`;

  async registerOwner(data: TRegisterOwnerDataModel): Promise<IResponse<IRegisterOwnerResponse>> {
    try {
      const dataToSend = registerFormToRegisterOwnerMapper(data);
      const response = await fetch(`${this.urlBase}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async login(data: TLoginSchema): Promise<IResponse<ILoginResponse>> {
    try {
      const response = await fetch(`${this.urlBase}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const authService = new AuthService();
