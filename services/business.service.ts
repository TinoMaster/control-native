import { apiConfig } from "config/api.config";
import { requestService } from "./request.service";
import { IResponse } from "types/request.types";
import { BusinessModel } from "models/api";
import { handleFetchError } from "utilities/helpers/errorManager";

class BusinessService {
  private readonly urlBase = apiConfig.baseUrl;

  async getBusinesses(): Promise<IResponse<BusinessModel[]>> {
    try {
      return await requestService.fetch<BusinessModel[]>(`${this.urlBase}/superadmin/businesses`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getBusinessById(id: string): Promise<IResponse<BusinessModel>> {
    try {
      return await requestService.fetch<BusinessModel>(`${this.urlBase}/owner/businesses/${id}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveBusiness(business: BusinessModel): Promise<IResponse<BusinessModel>> {
    try {
      return await requestService.fetch<BusinessModel>(`${this.urlBase}/owner/businesses`, {
        method: "POST",
        body: JSON.stringify(business)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateBusiness(id: string, business: BusinessModel): Promise<IResponse<BusinessModel>> {
    try {
      return await requestService.fetch<BusinessModel>(`${this.urlBase}/owner/businesses/${id}`, {
        method: "PUT",
        body: JSON.stringify(business)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteBusiness(id: string): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(`${this.urlBase}/owner/businesses/${id}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const businessService = new BusinessService();
