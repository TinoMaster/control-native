import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ByBusinessAndDateRequestModel } from "models/api/requests/byBusinessAndDateRequest.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { serviceSaleService } from "services/serviceSales.service";
import { useBusinessStore } from "store/business.store";

interface ServiceSaleQueryOptions {
  startDate?: Date;
  endDate?: Date;
  enabled?: boolean;
}

export const useServiceSale = (options?: ServiceSaleQueryOptions) => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const requestType: ByBusinessAndDateRequestModel = {
    businessId: businessId ?? 0,
    startDate: options?.startDate ?? new Date(),
    endDate: options?.endDate ?? new Date()
  };

  const {
    data: serviceSales = [],
    isLoading: loadingServiceSales,
    refetch: refetchServiceSales
  } = useQuery({
    queryKey: ["serviceSales", businessId, options?.startDate, options?.endDate],
    queryFn: async ({ queryKey }) => {
      // El queryKey contiene los parámetros que se pueden usar si es necesario
      const response = await serviceSaleService.getServiceSalesByBusinessIdAndDate(requestType);
      return response.data || [];
    },
    enabled: options?.enabled !== undefined ? !!businessId && options.enabled : !!businessId
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

  const { mutate: editServiceSale, isPending: isLoadingEditServiceSale } = useMutation({
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
    isLoadingEditServiceSale,
    refetchServiceSales,
    saveServiceSale,
    editServiceSale,
    deleteServiceSale
  };
};
