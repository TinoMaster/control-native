import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

export const useBusinessFinalSale = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();

  const { showNotification } = useNotification();

  const { data: todayReports, isLoading: loadingTodayReports } = useQuery<BusinessFinalSaleModelResponse[] | undefined>(
    {
      queryKey: ["todayReports", businessId],
      queryFn: async () => {
        const today = new Date();
        const request: ByBusinessAndDateRequestModel = {
          businessId: businessId ?? 0,
          startDate: today,
          endDate: today
        };

        const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(request);

        return response.data || [];
      }
    }
  );

  const { mutateAsync: saveBusinessFinalSale, isPending: loadingSave } = useMutation({
    mutationFn: (businessFinalSale: BusinessFinalSaleModelToCreate) =>
      businessFinalSaleService.saveBusinessFinalSale(businessFinalSale),
    onSuccess: (re) => {
      queryClient.invalidateQueries({
        queryKey: ["todayReports", businessId]
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
        queryKey: ["todayReports", businessId]
      });
    },
    onError: () => {
      showNotification("Error al eliminar la venta final de negocio", "error");
    }
  });

  const machinesAlreadySelected = () => {
    return todayReports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return todayReports?.map((report) => report.workers).flat();
  };

  return {
    todayReports,
    loadingTodayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete
  };
};
