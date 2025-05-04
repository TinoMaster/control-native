import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

// Create a key for storing the selected date in the query client cache
const SELECTED_DATE_CACHE_KEY = ["selectedReportDate"];

export const useBusinessFinalSale = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();

  // Get the initial date from the query client cache or use today's date
  const getInitialDate = (): Date => {
    const cachedDate = queryClient.getQueryData<string>(SELECTED_DATE_CACHE_KEY);
    return cachedDate ? new Date(cachedDate) : new Date();
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate);

  // Update the cache when the selected date changes
  const updateSelectedDate = (date: Date) => {
    setSelectedDate(date);
    queryClient.setQueryData(SELECTED_DATE_CACHE_KEY, date.toISOString());
  };

  const { showNotification } = useNotification();

  /**
   * Fetches business final sales for the selected date
   * Using a stable query key that doesn't depend on the component instance
   */
  const { data: selectedReports, isLoading: loadingReports } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["reports", businessId, selectedDate.toISOString()],
    queryFn: async () => {
      const request: ByBusinessAndDateRequestModel = {
        businessId: businessId ?? 0,
        startDate: selectedDate,
        endDate: selectedDate
      };

      const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(request);
      return response.data || [];
    },
    // Keep the data in the cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Don't refetch on window focus
    refetchOnWindowFocus: false
  });

  const { mutateAsync: saveBusinessFinalSale, isPending: loadingSave } = useMutation({
    mutationFn: (businessFinalSale: BusinessFinalSaleModelToCreate) =>
      businessFinalSaleService.saveBusinessFinalSale(businessFinalSale),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports", businessId]
      });
    },
    onError: () => {
      showNotification("Error al crear la venta final de negocio", "error");
    }
  });

  const { mutateAsync: deleteBusinessFinalSale, isPending: loadingDelete } = useMutation({
    mutationFn: (id: number) => businessFinalSaleService.deleteBusinessFinalSale(id),
    onSuccess: () => {
      showNotification("Venta final de negocio eliminada correctamente", "success");
      queryClient.invalidateQueries({
        queryKey: ["reports", businessId]
      });
    },
    onError: () => {
      showNotification("Error al eliminar la venta final de negocio", "error");
    }
  });

  const machinesAlreadySelected = () => {
    return selectedReports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return selectedReports?.map((report) => report.workers).flat();
  };

  return {
    selectedReports,
    loadingReports,
    selectedDate,
    setSelectedDate: updateSelectedDate,
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete,
    machinesAlreadySelected,
    workersAlreadySelected
  };
};
