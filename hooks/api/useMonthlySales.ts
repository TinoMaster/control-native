import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { useState } from "react";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

// Interfaz para el objeto de selección de mes y año
interface MonthYearSelection {
  month: number;
  year: number;
}

// Clave para almacenar el mes y año seleccionados en el QueryClient
const MONTH_YEAR_CACHE_KEY = ["monthYearSelection"] as const;

export const useMonthlySales = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Obtener el mes y año del caché de TanStack Query o usar valores por defecto
  const cachedMonthYear = queryClient.getQueryData<MonthYearSelection>(MONTH_YEAR_CACHE_KEY);
  const currentDate = new Date();

  // Estado local que se inicializa con los valores del caché o valores por defecto
  const [selectedMonth, setSelectedMonth] = useState<number>(
    cachedMonthYear?.month ?? currentDate.getMonth() + 1
  );  
  const [selectedYear, setSelectedYear] = useState<number>(
    cachedMonthYear?.year ?? currentDate.getFullYear()
  );

  // Query for monthly reports
  const {
    data: monthlyReports = [],
    isLoading: loadingMonthlyReports,
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

  // Actualizar mes y año, y guardar en caché
  const updateMonthAndYear = (month: number, year: number) => {
    // Actualizar estado local
    setSelectedMonth(month);
    setSelectedYear(year);

    // Guardar en caché para compartir entre componentes
    queryClient.setQueryData<MonthYearSelection>(MONTH_YEAR_CACHE_KEY, { month, year });

    // Invalidar consulta para forzar recarga de datos
    queryClient.invalidateQueries({
      queryKey: ["reports", "monthly", businessId, month, year]
    });
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
