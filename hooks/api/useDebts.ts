import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { DebtModel } from "models/api/debt.model";
import { debtService } from "services/debt.service";
import { useBusinessStore } from "store/business.store";

export const useDebts = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showNotification } = useNotification();

  const {
    data: debts = [],
    isLoading: loadingDebts,
    refetch: refetchDebts
  } = useQuery({
    queryKey: ["debts", businessId],
    queryFn: async () => {
      if (!businessId) {
        return [];
      }
      const response = await debtService.getAllDebtsByBusinessId(businessId);
      console.log(response);
      return response.data || [];
    },
    enabled: !!businessId
  });

  const getDebtById = (id: number) => {
    return debts.find((debt) => Number(debt.id) === id);
  };

  const { mutate: saveDebt, isPending: loadingSave } = useMutation({
    mutationFn: (debt: DebtModel) => debtService.saveDebt(debt),
    onSuccess: (response) => {
      if (response.status === 200 && response.data) {
        showNotification("Deuda guardada correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["debts", businessId] });
        router.replace("/(tabs)/sales/debts");
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

  const { mutate: updateDebt, isPending: loadingUpdate } = useMutation({
    mutationFn: (debt: DebtModel) => debtService.updateDebt(debt),
    onSuccess: (response) => {
      if (response.status === 200 && response.data) {
        showNotification("Deuda actualizada correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["debts", businessId] });
        router.replace("/(tabs)/sales/debts");
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

  const { mutate: deleteDebt, isPending: loadingDelete } = useMutation({
    mutationFn: (debtId: number) => debtService.deleteDebt(debtId),
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification("Deuda eliminada correctamente", "success");
        queryClient.invalidateQueries({ queryKey: ["debts", businessId] });
        router.replace("/(tabs)/sales/debts");
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

  const getDebtsInActualDay = () => {
    const today = new Date();
    return debts.filter((debt) => {
      const debtDate = debt.createdAt ? new Date(debt.createdAt) : null;
      return (
        debtDate?.getDate() === today.getDate() &&
        debtDate?.getMonth() === today.getMonth() &&
        debtDate?.getFullYear() === today.getFullYear()
      );
    });
  };

  const isDebtInActualDay = (debt: DebtModel): boolean => {
    return debts.some((d) => d.id === debt.id);
  };

  return {
    debts,
    loadingDebts,
    refetchDebts,
    getDebtById,
    saveDebt,
    loadingSave,
    updateDebt,
    loadingUpdate,
    deleteDebt,
    loadingDelete,
    getDebtsInActualDay,
    isDebtInActualDay
  };
};
