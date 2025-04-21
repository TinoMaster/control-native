import { BusinessModel } from "models/api";
import { secureStorage } from "utilities/storage/secure-storage";

export const selectBusiness = async (businesses: BusinessModel[]): Promise<BusinessModel> => {
  const businessId = await secureStorage.getItem("businessId");
  const business = businesses.find((b) => b.id === Number(businessId));
  return business ?? businesses[0];
};
