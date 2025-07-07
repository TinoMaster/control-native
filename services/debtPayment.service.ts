import { apiConfig } from "config/api.config";
import { DebtPaymentModel } from "models/api/debtPayment.model";
import { IResponse } from "types/request.types";
import { requestService } from "./request.service";
import { handleFetchError } from "utilities/helpers/errorManager";

class DebtPaymentService {
  private readonly privateUrl = apiConfig.privateUrl;

  async saveDebtPayment(debtPayment: DebtPaymentModel): Promise<IResponse<DebtPaymentModel>> {
    try {
      return await requestService.fetch<DebtPaymentModel>(`${this.privateUrl}/debtPayment`, {
        method: "POST",
        body: JSON.stringify(debtPayment)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getDebtPaymentsByDebtId(debtId: number): Promise<IResponse<DebtPaymentModel[]>> {
    try {
      return await requestService.fetch<DebtPaymentModel[]>(
        `${this.privateUrl}/debtPayment/${debtId}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const debtPaymentService = new DebtPaymentService();
