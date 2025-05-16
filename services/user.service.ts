import { apiConfig } from "config/api.config";
import { UserModel } from "models/api";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";
import { SuperAdminModel } from "models/api/superadmin.model";

class UserService {
  private readonly privateUrl = apiConfig.privateUrl;
  private readonly publicUrl = apiConfig.publicUrl;

  async getUser(email: string): Promise<IResponse<UserModel>> {
    try {
      return await requestService.fetch<UserModel>(`${this.privateUrl}/users/byEmail/${email}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async existAnyUser(): Promise<boolean> {
    try {
      const response = await fetch(`${this.publicUrl}/users/exist`);
      const data = await response.json();
      return data.data.response;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  async createSuperAdmin(user: SuperAdminModel): Promise<IResponse<UserModel>> {
    try {
      const response: Response = await fetch(`${this.publicUrl}/register/superadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data: IResponse<UserModel> = await response.json();
      return data;
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const userService = new UserService();
