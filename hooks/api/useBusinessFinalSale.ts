import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { useState } from "react";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

export enum QueryTypeBusinessFinalSale {
  DAILY = "daily",
  MONTHLY = "monthly"
}

export const useBusinessFinalSale = (type: QueryTypeBusinessFinalSale = QueryTypeBusinessFinalSale.MONTHLY) => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Estados para controlar el tipo de consulta y fechas
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  // Consulta de reportes (por día o por mes)
  const {
    data: reports = [],
    isLoading: loadingReports,
    refetch,
    isError,
    error
  } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["reports", "monthly", businessId, selectedMonth, selectedYear, type],
    queryFn: async () => {
      if (type === QueryTypeBusinessFinalSale.DAILY) {
        const request: ByBusinessAndDateRequestModel = {
          businessId: businessId ?? 0,
          startDate: new Date(),
          endDate: new Date()
        };
        const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(request);
        return response.data || [];
      } else {
        const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndMonth(
          businessId ?? 0,
          selectedMonth,
          selectedYear
        );
        return response.data || [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos por defecto
    refetchOnWindowFocus: false,
    enabled: !!businessId
  });

  // Mutación para guardar un nuevo reporte
  const { mutateAsync: saveBusinessFinalSale, isPending: loadingSave } = useMutation({
    mutationFn: (businessFinalSale: BusinessFinalSaleModelToCreate) =>
      businessFinalSaleService.saveBusinessFinalSale(businessFinalSale),
    onSuccess: () => {
      showNotification("Reporte guardado correctamente", "success");
      queryClient.invalidateQueries({
        queryKey: ["reports", "daily", businessId]
      });
      queryClient.invalidateQueries({
        queryKey: ["reports", "monthly", businessId, selectedMonth, selectedYear, type]
      });
    },
    onError: () => {
      showNotification("Error al crear el reporte", "error");
    }
  });

  // Mutación para eliminar un reporte
  const { mutateAsync: deleteBusinessFinalSale, isPending: loadingDelete } = useMutation({
    mutationFn: (id: number) => businessFinalSaleService.deleteBusinessFinalSale(id),
    onSuccess: () => {
      showNotification("Reporte eliminado correctamente", "success");
      queryClient.invalidateQueries({
        queryKey: ["reports", "daily", businessId]
      });
      queryClient.invalidateQueries({
        queryKey: ["reports", "monthly", businessId, selectedMonth, selectedYear, type]
      });
    },
    onError: () => {
      showNotification("Error al eliminar el reporte", "error");
    }
  });

  const setMonthlyQuery = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // Para mantener compatibilidad con código existente
  const updateMonthAndYear = (month: number, year: number) => {
    setMonthlyQuery(month, year);
  };

  // Funciones auxiliares para verificar elementos ya seleccionados
  const machinesAlreadySelected = () => {
    return reports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return reports?.map((report) => report.workers).flat();
  };

  return {
    // Datos de reportes
    reports,
    loadingReports,
    isError,
    error,
    refetch,

    // Estado actual de la consulta
    selectedMonth,
    selectedYear,

    // Funciones para cambiar el tipo de consulta
    setMonthlyQuery,
    updateMonthAndYear, // Para compatibilidad con código existente

    // Mutaciones
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete,

    // Funciones auxiliares
    machinesAlreadySelected,
    workersAlreadySelected
  };
};
