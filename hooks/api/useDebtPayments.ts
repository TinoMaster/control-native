import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { DebtPaymentModel } from "models/api/debtPayment.model";
import { debtPaymentService } from "services/debtPayment.service";
import { useBusinessStore } from "store/business.store";

interface UseDebtPaymentsProps {
  debtId: number;
}

export const useDebtPayments = ({ debtId }: UseDebtPaymentsProps) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const businessId = useBusinessStore((state) => state.businessId);

  const { data: debtPayments = [], isLoading: loadingDebtPayments } = useQuery({
    queryKey: ["debtPayments", debtId],
    queryFn: async () => {
      const response = await debtPaymentService.getDebtPaymentsByDebtId(debtId);
      return response.data ?? [];
    }
  });

  const { mutate: saveDebtPayment, isPending: loadingSave } = useMutation({
    mutationFn: (debtPayment: DebtPaymentModel) => debtPaymentService.saveDebtPayment(debtPayment),
    onSuccess: (response, debtPayment) => {
      if (response.status === 200 && response.data) {
        showNotification("Pago guardado correctamente", "success");

        queryClient.invalidateQueries({ queryKey: ["debtPayments", debtId] });

        queryClient.setQueryData(["debts", businessId], (oldData: any) => {
          if (!oldData) return oldData;

          return oldData.map((debt: any) => {
            if (debt.id === debtId) {
              return {
                ...debt,
                paid: debt.paid + debtPayment.amount
              };
            }
            return debt;
          });
        });
      } else {
        showNotification(
          "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
          "error"
        );
      }
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    }
  });

  return {
    debtPayments,
    loadingDebtPayments,
    saveDebtPayment,
    loadingSave
  };
};
