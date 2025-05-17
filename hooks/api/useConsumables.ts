import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { ConsumableModel } from "models/api/consumables.model";
import { consumableService } from "services/consumables.service";
import { useBusinessStore } from "store/business.store";

export const useConsumables = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const router = useRouter();

  const { data: consumables = [], isLoading: loadingConsumables } = useQuery({
    queryKey: ["consumables", businessId],
    queryFn: async () => {
      const response = await consumableService.getConsumablesByBusinessId(businessId!);
      return response.data || [];
    },
    enabled: !!businessId
  });

  const { mutate: onSaveConsumable, isPending: loadingSave } = useMutation({
    mutationFn: (consumable: ConsumableModel) => consumableService.saveConsumable(consumable),
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 200 && response.data) {
        showNotification("Consumible guardado correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["consumables"] });
        router.back();
      } else {
        showNotification(
          "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
          "error"
        );
      }
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  const { mutate: onUpdateConsumable, isPending: updatingConsumable } = useMutation({
    mutationFn: (consumable: ConsumableModel) => consumableService.updateConsumable(consumable),
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 200 && response.data) {
        showNotification("Consumible actualizado correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["consumables"] });
      } else {
        showNotification(
          "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
          "error"
        );
      }
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  const { mutate: onDeleteConsumable, isPending: deletingConsumable } = useMutation({
    mutationFn: (id: number) => consumableService.deleteConsumable(id),
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 200) {
        showNotification("Consumible eliminado correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["consumables"] });
      } else {
        showNotification(
          "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
          "error"
        );
      }
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  return {
    consumables,
    onSaveConsumable,
    onDeleteConsumable,
    loadingConsumables,
    loadingSave,
    updatingConsumable,
    onUpdateConsumable,
    deletingConsumable
  };
};
