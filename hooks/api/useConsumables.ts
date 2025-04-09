import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ConsumableModel } from "models/api/consumables.model";
import { consumableService } from "services/consumables.service";
import { useBusinessStore } from "store/business.store";

export const useConsumables = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { data: consumables = [] } = useQuery({
    queryKey: ["consumables", businessId],
    queryFn: async () => {
      const response = await consumableService.getConsumablesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: onSaveConsumable } = useMutation({
    mutationFn: (consumable: ConsumableModel) =>
      consumableService.saveConsumable(consumable),
    onSuccess: () => {
      showNotification("Consumible guardado correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["consumables"] });
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    },
  });

  const { mutate: onDeleteConsumable } = useMutation({
    mutationFn: (id: number) => consumableService.deleteConsumable(id),
    onSuccess: () => {
      showNotification("Consumible eliminado correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["consumables"] });
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    },
  });

  return {
    consumables,
    onSaveConsumable,
    onDeleteConsumable,
  };
};
