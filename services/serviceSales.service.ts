import { apiConfig } from "config/api.config";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class ServiceSaleService {
  private readonly privateUrl = apiConfig.privateUrl;

  async getServiceSalesByBusinessIdAndDate(
    requestType: ByBusinessAndDateRequestModel
  ): Promise<IResponse<ServiceSaleModel[]>> {
    try {
      return await requestService.fetch<ServiceSaleModel[]>(`${this.privateUrl}/serviceSale/getByBusinessAndDate`, {
        method: "POST",
        body: JSON.stringify(requestType)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveServiceSale(serviceSale: ServiceSaleModel): Promise<IResponse<ServiceSaleModel>> {
    try {
      return await requestService.fetch<ServiceSaleModel>(`${this.privateUrl}/serviceSale`, {
        method: "POST",
        body: JSON.stringify(serviceSale)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateServiceSale(serviceSale: ServiceSaleModel): Promise<IResponse<ServiceSaleModel>> {
    try {
      return await requestService.fetch<ServiceSaleModel>(`${this.privateUrl}/serviceSale`, {
        method: "PUT",
        body: JSON.stringify(serviceSale)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteServiceSale(id: number): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(`${this.privateUrl}/serviceSale/${id}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const serviceSaleService = new ServiceSaleService();
