import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { useState } from "react";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

/**
 * Hook for managing daily sales or sales within a specific date range
 */
export const useDailySales = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Date range state
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Query for daily reports
  const {
    data: dailyReports = [],
    isLoading: loadingDailyReports,
    refetch: refetchDailyReports,
    isError: isDailyError,
    error: dailyError
  } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["reports", "daily", businessId, startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const request: ByBusinessAndDateRequestModel = {
        businessId: businessId ?? 0,
        startDate,
        endDate
      };
      const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(request);
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!businessId
  });

  // Mutation to save a new report
  const { mutateAsync: saveDailyReport, isPending: loadingSave } = useMutation({
    mutationFn: (businessFinalSale: BusinessFinalSaleModelToCreate) =>
      businessFinalSaleService.saveBusinessFinalSale(businessFinalSale),
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification("Reporte guardado correctamente", "success");
      } else {
        showNotification("Hubo un error al guardar el reporte", "error");
      }
      queryClient.invalidateQueries({
        queryKey: ["reports", "daily", businessId]
      });
    },
    onError: () => {
      showNotification("Error al crear el reporte", "error");
    }
  });

  // Mutation to delete a report
  const { mutateAsync: deleteDailyReport, isPending: loadingDelete } = useMutation({
    mutationFn: (id: number) => businessFinalSaleService.deleteBusinessFinalSale(id),
    onSuccess: () => {
      showNotification("Reporte eliminado correctamente", "success");
      queryClient.invalidateQueries({
        queryKey: ["reports", "daily", businessId]
      });
    },
    onError: () => {
      showNotification("Error al eliminar el reporte", "error");
    }
  });

  // Update date range
  const setDateRange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Helper functions to check already selected items
  const machinesAlreadySelected = () => {
    return dailyReports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return dailyReports?.map((report) => report.workers).flat();
  };

  return {
    // Report data
    dailyReports,
    loadingDailyReports,
    isDailyError,
    dailyError,
    refetchDailyReports,

    // Current query state
    startDate,
    endDate,

    // Functions to change query type
    setDateRange,

    // Mutations
    saveDailyReport,
    loadingSave,
    deleteDailyReport,
    loadingDelete,

    // Helper functions
    machinesAlreadySelected,
    workersAlreadySelected
  };
};
