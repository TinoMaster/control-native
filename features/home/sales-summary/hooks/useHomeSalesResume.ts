import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ETimeRange } from "data/global.data";
import { homeStatsService } from "services/statistics/homeStats.service";
import { useBusinessStore } from "store/business.store";
import { getTimeRange } from "utilities/helpers/globals.helpers";

export function useHomeSalesResume(selectedTimeRange?: ETimeRange) {
  const businessId = useBusinessStore((state) => state.businessId);
  const timeRange = getTimeRange(selectedTimeRange ?? ETimeRange.THIS_WEEK);
  const queryClient = useQueryClient();

  const {
    data: salesResumeData,
    isLoading: isLoadingSalesResume,
    refetch: originalRefetch
  } = useQuery({
    queryKey: ["salesData", selectedTimeRange],
    queryFn: async () => {
      const response = await homeStatsService.getSalesResume({
        businessId: businessId ?? 0,
        ...timeRange
      });
      return response;
    },
    enabled: !!businessId && businessId > 0
  });

  // Función mejorada para refetch que invalidará todas las consultas relacionadas con salesData
  const refetchSalesResume = async () => {
    // Invalidar todas las consultas que comienzan con "salesData"
    await queryClient.invalidateQueries({ queryKey: ["salesData"] });
    return originalRefetch();
  };

  return {
    salesResumeData,
    isLoadingSalesResume,
    refetchSalesResume
  };
}
