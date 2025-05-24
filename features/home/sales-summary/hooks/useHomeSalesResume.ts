import { useQuery } from "@tanstack/react-query";
import { ETimeRange } from "data/global.data";
import { homeStatsService } from "services/statistics/homeStats.service";
import { useBusinessStore } from "store/business.store";
import { getTimeRange } from "utilities/helpers/globals.helpers";

export function useHomeSalesResume(selectedTimeRange: ETimeRange) {
  const businessId = useBusinessStore((state) => state.businessId);
  const timeRange = getTimeRange(selectedTimeRange);

  const { data: salesResumeData, isLoading: isLoadingSalesResume } = useQuery({
    queryKey: ["salesData", selectedTimeRange],
    queryFn: async () => {
      const response = await homeStatsService.getSalesResume({
        businessId: businessId ?? 0,
        ...timeRange
      });
      console.log(response);
      return response;
    },
    enabled: !!businessId && businessId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos antes de considerar los datos obsoletos
    gcTime: 10 * 60 * 1000 // 10 minutos antes de eliminar datos de la caché
  });

  return {
    salesResumeData,
    isLoadingSalesResume
  };
}
