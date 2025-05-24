import { DatePeriod } from "./datePeriod.model";

export interface ByBusinessAndDateRequestModel extends DatePeriod {
  businessId: number;
}
