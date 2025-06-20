import { apiConfig } from "config/api.config";
import { ETaskStatus, TaskModel } from "models/api";
import { PaginationRequest } from "models/api/requests/paginationRequest.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "./request.service";

interface IGetParams {
  businessId: string;
  status?: ETaskStatus;
  page?: number;
  size?: number;
}

class TaskService {
  private readonly privateUrl = apiConfig.privateUrl;

  async getTasksByBusinessId({
    businessId,
    page = 0,
    size = 10
  }: IGetParams): Promise<IResponse<PaginationRequest<TaskModel>>> {
    try {
      return await requestService.fetch<PaginationRequest<TaskModel>>(
        `${this.privateUrl}/tasks/by_business?businessId=${businessId}&page=${page}&size=${size}`
      );
    } catch (error) {
      console.error(error);
      return handleFetchError(error);
    }
  }

  async getTaskByBusinessIdAndStatus({
    businessId,
    status,
    page = 0,
    size = 10
  }: IGetParams): Promise<IResponse<PaginationRequest<TaskModel>>> {
    try {
      return await requestService.fetch<PaginationRequest<TaskModel>>(
        `${this.privateUrl}/tasks/by_business_and_status?businessId=${businessId}&status=${status}&page=${page}&size=${size}`
      );
    } catch (error) {
      console.error(error);
      return handleFetchError(error);
    }
  }

  async getTaskById(id: number): Promise<IResponse<TaskModel>> {
    try {
      return await requestService.fetch<TaskModel>(`${this.privateUrl}/tasks/${id}`);
    } catch (error) {
      console.error(error);
      return handleFetchError(error);
    }
  }

  async createTask(task: TaskModel): Promise<IResponse<TaskModel>> {
    try {
      return await requestService.fetch<TaskModel>(`${this.privateUrl}/tasks`, {
        method: "POST",
        body: JSON.stringify(task)
      });
    } catch (error) {
      console.error(error);
      return handleFetchError(error);
    }
  }

  async updateTask(task: TaskModel): Promise<IResponse<TaskModel>> {
    try {
      return await requestService.fetch<TaskModel>(`${this.privateUrl}/tasks`, {
        method: "PUT",
        body: JSON.stringify(task)
      });
    } catch (error) {
      console.error(error);
      return handleFetchError(error);
    }
  }
}

export const taskService = new TaskService();
