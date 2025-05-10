import { apiConfig } from "config/api.config";
import { MachineModel } from "models/api/machine.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class MachineService {
  private readonly adminUrl = apiConfig.adminUrl;

  async saveMachine(machine: MachineModel): Promise<IResponse<MachineModel>> {
    try {
      return await requestService.fetch<MachineModel>(`${this.adminUrl}/machine`, {
        method: "POST",
        body: JSON.stringify(machine)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteMachine(id: string): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(`${this.adminUrl}/machine/${id}`, {
        method: "DELETE"
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateMachine(machine: MachineModel): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(`${this.adminUrl}/machine`, {
        method: "PUT",
        body: JSON.stringify(machine)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const machineService = new MachineService();
