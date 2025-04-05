import * as SecureStore from "expo-secure-store";
import { BusinessModel } from "models/api";

export const selectBusiness = async (
  businesses: BusinessModel[]
): Promise<BusinessModel> => {
  const businessId = await SecureStore.getItemAsync("businessId");
  const business = businesses.find((b) => b.id === Number(businessId));
  return business ? business : businesses[0];
};
