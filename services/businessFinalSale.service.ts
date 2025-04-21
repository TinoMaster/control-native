import { apiConfig } from "config/api.config";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class BusinessFinalSaleService {
  private readonly adminUrl = apiConfig.adminUrl;
  private readonly privateUrl = apiConfig.privateUrl;

  async getBusinessFinalSalesByBusinessIdAndDate(
    requestType: ByBusinessAndDateRequestModel
  ): Promise<IResponse<BusinessFinalSaleModelResponse[]>> {
    try {
      return await requestService.fetch<BusinessFinalSaleModelResponse[]>(
        `${this.privateUrl}/business-final-sale/getByBusinessAndDate`,
        {
          method: "POST",
          body: JSON.stringify(requestType)
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getLatestBusinessFinalSalesWithAllMachines(
    businessId: number
  ): Promise<IResponse<BusinessFinalSaleModelResponse[]>> {
    try {
      return await requestService.fetch<BusinessFinalSaleModelResponse[]>(
        `${this.privateUrl}/business-final-sale/latest/${businessId}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async existEmployeeInAnyBusinessFinalSale(employeeId: string): Promise<IResponse<boolean>> {
    try {
      return await requestService.fetch<boolean>(`${this.adminUrl}/business-final-sale/exist-employee/${employeeId}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveBusinessFinalSale(businessSale: BusinessFinalSaleModelToCreate): Promise<IResponse<boolean>> {
    try {
      return await requestService.fetch<boolean>(`${this.privateUrl}/business-final-sale`, {
        method: "POST",
        body: JSON.stringify(businessSale)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteBusinessFinalSale(id: number): Promise<IResponse<boolean>> {
    try {
      return await requestService.fetch<boolean>(`${this.adminUrl}/business-final-sale/${id}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const businessFinalSaleService = new BusinessFinalSaleService();
