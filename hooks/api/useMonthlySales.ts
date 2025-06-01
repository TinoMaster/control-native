import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { useState } from "react";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

/**
 * Hook for managing monthly sales data
 */
export const useMonthlySales = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // State for controlling month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  // Query for monthly reports
  const {
    data: monthlyReports = [],
    isLoading: loadingMonthlyReports,
    refetch: refetchMonthlyReports,
    isError: isMonthlyError,
    error: monthlyError
  } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["reports", "monthly", businessId, selectedMonth, selectedYear],
    queryFn: async () => {
      const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndMonth(
        businessId ?? 0,
        selectedMonth,
        selectedYear
      );
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!businessId
  });

  // Mutation to delete a report
  const { mutateAsync: deleteMonthlyReport, isPending: loadingDelete } = useMutation({
    mutationFn: (id: number) => businessFinalSaleService.deleteBusinessFinalSale(id),
    onSuccess: () => {
      showNotification("Reporte eliminado correctamente", "success");
      queryClient.invalidateQueries({
        queryKey: ["reports", "monthly", businessId, selectedMonth, selectedYear]
      });
    },
    onError: () => {
      showNotification("Error al eliminar el reporte", "error");
    }
  });

  // Update month and year
  const updateMonthAndYear = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // Helper functions to check already selected items
  const machinesAlreadySelected = () => {
    return monthlyReports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return monthlyReports?.map((report) => report.workers).flat();
  };

  return {
    // Report data
    monthlyReports,
    loadingMonthlyReports,
    isMonthlyError,
    monthlyError,
    refetchMonthlyReports,

    // Current query state
    selectedMonth,
    selectedYear,

    // Functions to change query parameters
    updateMonthAndYear,

    // Mutations
    deleteMonthlyReport,
    loadingDelete,

    // Helper functions
    machinesAlreadySelected,
    workersAlreadySelected
  };
};
