import { apiConfig } from "config/api.config";
import { EmployeeModel } from "models/api/employee.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

class EmployeeService {
  private urlAdmin = apiConfig.adminUrl;
  private urlPrivate = apiConfig.privateUrl;
  private urlSuperAdmin = apiConfig.superadminUrl;

  async getEmployees(): Promise<IResponse<EmployeeModel[]>> {
    try {
      return await requestService.fetch<EmployeeModel[]>(
        `${this.urlSuperAdmin}/employees`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeeByUserId(id: number): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlPrivate}/employees/byUserId/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeeById(id: string): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlAdmin}/employees/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeesByBusinessId(
    id: number
  ): Promise<IResponse<EmployeeModel[]>> {
    try {
      return await requestService.fetch<EmployeeModel[]>(
        `${this.urlAdmin}/employees/byBusiness/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveEmployee(
    employee: EmployeeModel
  ): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlAdmin}/employees`,
        {
          method: "POST",
          body: JSON.stringify(employee),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async updateEmployee(
    employeeToUpdate: EmployeeModel
  ): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlAdmin}/employees`,
        {
          method: "PUT",
          body: JSON.stringify(employeeToUpdate),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteEmployee(id: string): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(
        `${this.urlAdmin}/employees/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const employeeService = new EmployeeService();
