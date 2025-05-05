import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { BusinessFinalSaleModelResponse, BusinessFinalSaleModelToCreate } from "models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useBusinessStore } from "store/business.store";

export const useCurrentBusinessFinalSale = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();

  const { showNotification } = useNotification();

  /**
   * Fetches business final sales for the selected date
   * Using a stable query key that doesn't depend on the component instance
   */
  const { data: todayReports, isLoading: loadingReports } = useQuery<BusinessFinalSaleModelResponse[] | undefined>({
    queryKey: ["reports", businessId],
    queryFn: async () => {
      const request: ByBusinessAndDateRequestModel = {
        businessId: businessId ?? 0,
        startDate: new Date(),
        endDate: new Date()
      };

      const response = await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(request);
      return response.data || [];
    },
    enabled: !!businessId
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
    return todayReports?.map((report) => report.machines.map((machine) => machine.id)).flat();
  };

  const workersAlreadySelected = () => {
    return todayReports?.map((report) => report.workers).flat();
  };

  return {
    todayReports,
    loadingReports,
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete,
    machinesAlreadySelected,
    workersAlreadySelected
  };
};
