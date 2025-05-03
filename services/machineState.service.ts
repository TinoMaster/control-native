import { apiConfig } from "config/api.config";
import { MachineStateModel } from "models/api/machineState.model";
import { requestService } from "./request.service";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";

class MachineStateService {
  private readonly privateUrl = apiConfig.privateUrl;

  async getMachineStatesByBusinessFinalSaleId(businessFinalSaleId: number): Promise<IResponse<MachineStateModel[]>> {
    try {
      return await requestService.fetch<MachineStateModel[]>(
        `${this.privateUrl}/machine-state/by-final-sale/${businessFinalSaleId}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getStatesByBusinessAndDate(businessId: number, date: Date): Promise<IResponse<MachineStateModel[]>> {
    try {
      return await requestService.fetch<MachineStateModel[]>(
        `${this.privateUrl}/machine-state/by-business-and-date/${businessId}`,
        {
          method: "GET",
          body: JSON.stringify({ date })
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getMachineStatesByFinalSaleAndMachineIds(
    businessFinalSaleId: number,
    machineIds: number[]
  ): Promise<IResponse<MachineStateModel[]>> {
    try {
      return await requestService.fetch<MachineStateModel[]>(
        `${this.privateUrl}/machine-state/by-final-sale-and-machine-ids/${businessFinalSaleId}`,
        {
          method: "GET",
          body: JSON.stringify(machineIds)
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getStatesByMachineAndDateRange(
    machineId: number,
    startDate: Date,
    endDate: Date
  ): Promise<IResponse<MachineStateModel[]>> {
    try {
      return await requestService.fetch<MachineStateModel[]>(
        `${this.privateUrl}/machine-state/by-machine-and-date-range/${machineId}`,
        {
          method: "GET",
          body: JSON.stringify({ startDate, endDate })
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const machineStateService = new MachineStateService();
