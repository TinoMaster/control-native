import { BusinessModel, ERole } from "models/api";
import { selectBusiness } from "utilities/helpers/selectBusiness";
import { secureStorage } from "utilities/storage/secure-storage";
import { create } from "zustand";

interface BusinessState {
  businessList: BusinessModel[];
  business: BusinessModel;
  businessId: number | undefined;
  loading: boolean;
  addBusinessToBusinessList: (newBusiness: BusinessModel) => void;
  onChangeBusiness: (id: number) => Promise<void>;
  initializeBusiness: (user: {
    role: ERole;
    businessesOwned: BusinessModel[];
    businesses: BusinessModel[];
  }) => Promise<void>;
  initializeBusinessFromStorage: () => Promise<void>;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businessList: [],
  business: {} as BusinessModel,
  businessId: undefined,
  loading: true,

  addBusinessToBusinessList: (newBusiness) => {
    set((state) => ({
      businessList: [...state.businessList, newBusiness]
    }));
  },

  onChangeBusiness: async (id) => {
    const { businessList } = get();
    const newBusiness = businessList.find((b) => b.id === id);
    if (newBusiness) {
      await secureStorage.setItem("businessId", newBusiness.id?.toString() ?? "");
      set({ business: newBusiness, businessId: newBusiness.id });
    }
  },

  initializeBusiness: async (user) => {
    const businessList = user.role === ERole.OWNER ? user.businessesOwned : user.businesses;
    const selectedBusiness = (await selectBusiness(businessList)) || businessList[0];

    set({
      loading: false,
      businessList,
      business: selectedBusiness,
      businessId: selectedBusiness?.id
    });
  },

  initializeBusinessFromStorage: async () => {
    try {
      const storedBusinessId = await secureStorage.getItem("businessId");
      if (storedBusinessId) {
        const businessId = parseInt(storedBusinessId, 10);
        const { businessList } = get();
        const storedBusiness = businessList.find((b) => b.id === businessId);
        if (storedBusiness) {
          set({ business: storedBusiness, businessId });
        }
      }
    } catch (error) {
      console.error("Error initializing business from storage:", error);
    }
  }
}));
