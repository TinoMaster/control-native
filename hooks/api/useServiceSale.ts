import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { serviceSaleService } from "services/serviceSales.service";
import { useBusinessStore } from "store/business.store";

export const useServiceSale = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const requestType: ByBusinessAndDateRequestModel = {
    businessId: businessId ?? 0,
    startDate: new Date(),
    endDate: new Date()
  };

  const { data: serviceSales, isLoading: loadingServiceSales } = useQuery({
    queryKey: ["serviceSales", businessId],
    queryFn: async () => {
      const response = await serviceSaleService.getServiceSalesByBusinessIdAndDate(requestType);
      return response.data || [];
    },
    enabled: !!businessId
  });

  const { mutate: saveServiceSale } = useMutation({
    mutationFn: (serviceSale: ServiceSaleModel) => serviceSaleService.saveServiceSale(serviceSale),
    onSuccess: () => {
      showNotification("Venta de servicio creada correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  const { mutate: editServiceSale } = useMutation({
    mutationFn: (serviceSale: ServiceSaleModel) => serviceSaleService.updateServiceSale(serviceSale),
    onSuccess: () => {
      showNotification("Venta de servicio actualizada correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  const { mutate: deleteServiceSale } = useMutation({
    mutationFn: (id: number) => serviceSaleService.deleteServiceSale(id),
    onSuccess: () => {
      showNotification("Venta de servicio eliminada correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  return {
    serviceSales,
    loadingServiceSales,
    saveServiceSale,
    editServiceSale,
    deleteServiceSale
  };
};
