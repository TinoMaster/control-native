import { apiConfig } from "config/api.config";
import { AddressModel } from "models/api/address.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class AddressService {
  private readonly adminUrl = apiConfig.adminUrl;

  async saveAddress(address: AddressModel): Promise<IResponse<AddressModel>> {
    try {
      return await requestService.fetch<AddressModel>(`${this.adminUrl}/address`, {
        method: "POST",
        body: JSON.stringify(address)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const addressService = new AddressService();
