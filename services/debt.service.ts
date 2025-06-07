import { apiConfig } from "config/api.config";
import { DebtModel } from "models/api/debt.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class DebtService {
  private readonly privateUrl = apiConfig.privateUrl;

  async getAllDebtsByBusinessId(businessId: number): Promise<IResponse<DebtModel[]>> {
    try {
      return await requestService.fetch<DebtModel[]>(`${this.privateUrl}/debts/${businessId}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getDebtsByDateRange(businessId: number, startDate: string, endDate: string): Promise<IResponse<DebtModel[]>> {
    try {
      return await requestService.fetch<DebtModel[]>(`${this.privateUrl}/debts/${businessId}/${startDate}/${endDate}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getPendingDebtsByBusinessId(businessId: number): Promise<IResponse<DebtModel[]>> {
    try {
      return await requestService.fetch<DebtModel[]>(`${this.privateUrl}/pending-debts/${businessId}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveDebt(debt: DebtModel): Promise<IResponse<DebtModel>> {
    try {
      return await requestService.fetch<DebtModel>(`${this.privateUrl}/debt`, {
        method: "POST",
        body: JSON.stringify(debt)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateDebt(debt: DebtModel): Promise<IResponse<DebtModel>> {
    try {
      return await requestService.fetch<DebtModel>(`${this.privateUrl}/debt`, {
        method: "PUT",
        body: JSON.stringify(debt)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteDebt(debtId: number): Promise<IResponse<void>> {
    try {
      return await requestService.fetch<void>(`${this.privateUrl}/debt/${debtId}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const debtService = new DebtService();
