import { apiConfig } from "config/api.config";
import { UserModel } from "models/api";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class UserService {
  private privateUrl = apiConfig.privateUrl;

  async getUser(email: string): Promise<IResponse<UserModel>> {
    try {
      return await requestService.fetch<UserModel>(
        `${this.privateUrl}/users/byEmail/${email}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const userService = new UserService();
