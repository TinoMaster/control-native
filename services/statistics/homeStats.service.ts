import { apiConfig } from "config/api.config";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { HomeSalesResume } from "models/api/statistics/homeSalesResume.model";
import { IResponse } from "types/request.types";
import { handleFetchError } from "utilities/helpers/errorManager";
import { requestService } from "../request.service";

class HomeStatsService {
  private readonly privateUrl = apiConfig.privateUrl;

  async getSalesResume(period: ByBusinessAndDateRequestModel): Promise<IResponse<HomeSalesResume>> {
    try {
      return await requestService.fetch<HomeSalesResume>(`${this.privateUrl}/home-stats/sales-resume-by-period`, {
        method: "POST",
        body: JSON.stringify(period)
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const homeStatsService = new HomeStatsService();
