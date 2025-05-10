import { useQuery } from "@tanstack/react-query";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { useState } from "react";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

export function useBusinessFinalSaleByMonth() {
  const businessId = useBusinessStore((state) => state.businessId);

  // Get current month and year for initial state
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1); // JavaScript months are 0-indexed
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  const {
    data: monthlySales,
    isLoading: loadingSales,
    isError,
    error,
    refetch
  } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["monthlySales", businessId, selectedMonth, selectedYear],
    queryFn: async () => {
      const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndMonth(
        businessId ?? 0,
        selectedMonth,
        selectedYear
      );
      return response.data || [];
    },
    // Keep the data in the cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Don't refetch on window focus
    refetchOnWindowFocus: false,
    enabled: !!businessId
  });

  // Function to update month and year and trigger refetch
  const updateMonthAndYear = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return {
    monthlySales,
    loadingSales,
    isError,
    error,
    selectedMonth,
    selectedYear,
    updateMonthAndYear,
    refetch
  };
}
