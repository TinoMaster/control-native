import { apiConfig } from "config/api.config";
import {
  BusinessFinalSaleModelResponse,
  BusinessFinalSaleModelToCreate
} from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class BusinessFinalSaleService {
  private readonly adminUrl = apiConfig.adminUrl;
  private readonly privateUrl = apiConfig.privateUrl;

  async getBusinessFinalSaleById(id: number): Promise<IResponse<BusinessFinalSaleModelResponse>> {
    try {
      return await requestService.fetch<BusinessFinalSaleModelResponse>(
        `${this.privateUrl}/business-final-sale/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

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

  async getBusinessFinalSalesByBusinessIdAndMonth(
    businessId: number,
    month: number,
    year: number
  ): Promise<IResponse<BusinessFinalSaleModelResponse[]>> {
    try {
      return await requestService.fetch<BusinessFinalSaleModelResponse[]>(
        `${this.privateUrl}/business-final-sale/bymonth/${businessId}`,
        {
          method: "POST",
          body: JSON.stringify({ year, month })
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

  /* Verifica si un empleado existe en alguna venta final en general de negocio */
  async existEmployeeInAnyBusinessFinalSale(
    employeeId: string
  ): Promise<IResponse<{ response: boolean }>> {
    try {
      return await requestService.fetch<{ response: boolean }>(
        `${this.adminUrl}/business-final-sale/exist-employee/${employeeId}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveBusinessFinalSale(
    businessSale: BusinessFinalSaleModelToCreate
  ): Promise<IResponse<boolean>> {
    try {
      return await requestService.fetch<boolean>(`${this.privateUrl}/business-final-sale`, {
        method: "POST",
        body: JSON.stringify(businessSale)
      });
    } catch (error: any) {
      console.log("Error in saveBusinessFinalSale:", error);
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
