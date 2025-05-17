import { apiConfig } from "config/api.config";
import { ConsumableModel } from "models/api/consumables.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class ConsumableService {
  private readonly urlAdmin = apiConfig.adminUrl;

  async getConsumablesByBusinessId(businessId: number): Promise<IResponse<ConsumableModel[]>> {
    try {
      return await requestService.fetch<ConsumableModel[]>(`${this.urlAdmin}/consumable/list/${businessId}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveConsumable(consumable: ConsumableModel): Promise<IResponse<ConsumableModel>> {
    try {
      return await requestService.fetch<ConsumableModel>(`${this.urlAdmin}/consumable`, {
        method: "POST",
        body: JSON.stringify(consumable)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateConsumable(consumable: ConsumableModel): Promise<IResponse<ConsumableModel>> {
    try {
      return await requestService.fetch<ConsumableModel>(`${this.urlAdmin}/consumable/${consumable.id}`, {
        method: "PUT",
        body: JSON.stringify(consumable)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteConsumable(id: number): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(`${this.urlAdmin}/consumable/${id}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const consumableService = new ConsumableService();
