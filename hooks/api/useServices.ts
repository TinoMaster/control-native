import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ServiceModel } from "models/api";
import { serviceService } from "services/servicesService";
import { useBusinessStore } from "store/business.store";

export const useService = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ["services", businessId],
    queryFn: async () => {
      const response = await serviceService.getServicesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: saveService } = useMutation({
    mutationFn: (service: ServiceModel) => serviceService.saveService(service),
    onSuccess: () => {
      showNotification("Servicio guardado correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    },
  });

  const { mutate: deleteService } = useMutation({
    mutationFn: (id: number) => serviceService.deleteService(id),
    onSuccess: () => {
      showNotification("Servicio eliminado correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    },
  });

  return {
    services,
    loadingServices,
    saveService,
    deleteService,
  };
};
