import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "config/react-query.config";
import { useNotification } from "contexts/NotificationContext";
import { businessService } from "services/business.service";

export const useAuthRequests = () => {
  const { showNotification } = useNotification();
  const { data: authRequests, isLoading: loadingAuthRequests } = useQuery({
    queryKey: ["authRequests"],
    queryFn: async () => {
      const response = await businessService.getAuthBusinessRequests();
      return response.data ?? [];
    },
    enabled: true
  });

  const { mutate: approveBusiness, isPending: loadingApproveBusiness } = useMutation({
    mutationFn: (ownerId: string) => businessService.approveBusiness(ownerId),
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification("Negocio aprobado correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["authRequests"] });
      } else {
        showNotification("Error al aprobar el negocio", "error");
      }
    },
    onError: () => {
      showNotification("Error al aprobar el negocio", "error");
    }
  });

  const { mutate: rejectBusiness, isPending: loadingRejectBusiness } = useMutation({
    mutationFn: (ownerId: string) => businessService.rejectBusiness(ownerId),
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification("Negocio rechazado correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["authRequests"] });
      } else {
        showNotification("Error al rechazar el negocio", "error");
      }
    },
    onError: () => {
      showNotification("Error al rechazar el negocio", "error");
    }
  });

  return {
    authRequests,
    loadingAuthRequests,
    approveBusiness,
    loadingApproveBusiness,
    rejectBusiness,
    loadingRejectBusiness
  };
};
