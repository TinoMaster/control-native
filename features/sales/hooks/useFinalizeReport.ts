import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { useCurrentBusinessFinalSale } from "hooks/api/useCurrentBusinessFinalSale";
import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelToCreate,
  CardPayment
} from "models/api/businessFinalSale.model";
import { CardModel } from "models/api/card.model";
import { MachineModel } from "models/api/machine.model";
import { MachineStateModel } from "models/api/machineState.model";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { useDailyReportStore } from "store/dailyReport.store";
import { useCardsFinalSaleStore } from "../store/useCardsFinalSale.store";
import { useDebtsFinalSaleStore } from "../store/useDebtsFinalSale.store";
import { useMachineFinalSaleStore } from "../store/useMachineFinalSale.store";
import { useMachineStateFinalSaleStore } from "../store/useMachineStateFinalSale.store";
import { useWorkersFinalSaleStore } from "../store/useWorkersFinalSale.store";

export const useFinalizeReport = () => {
  const { saveBusinessFinalSale } = useCurrentBusinessFinalSale();
  const { businessId, business } = useBusinessStore();
  const user = useAuthStore((state) => state.user);

  const router = useRouter();
  const { showNotification } = useNotification();

  const finalizeReport = (report: BusinessFinalSaleModel, cards: CardPayment[], machineStates: MachineStateModel[]) => {
    const cardsToSave: CardModel[] = cards.map((card) => ({
      number: card.cardNumber,
      amount: card.amount
    }));

    const machinesToSave: MachineModel[] =
      report.machines.length > 0 ? business.machines?.filter((m) => report.machines.includes(m.id!)) || [] : [];

    const reportsToSave: BusinessFinalSaleModelToCreate = {
      ...report,
      name: `Reporte ${business.name} ${new Date().toLocaleDateString()}`,
      paid: report.total - report.debts.reduce((acc, debt) => acc + (debt.total - debt.paid), 0),
      business: businessId!,
      cards: cardsToSave,
      machines: machinesToSave,
      doneBy: user?.id!,
      machineStates: machineStates,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    showNotification("Guardando reporte...", "info");

    saveBusinessFinalSale(reportsToSave, {
      onSuccess: (response) => {
        if (response.status === 200) {
          showNotification("Reporte finalizado correctamente", "success");
          clearAllReports();
          router.replace("/(tabs)/sales/current_day");
        } else {
          showNotification("Hubo un error al finalizar el reporte", "error");
        }
      },
      onError: (error) => {
        showNotification("Hubo un error al finalizar el reporte", "error");
      }
    });
  };

  const clearAllReports = () => {
    useDailyReportStore.getState().clearReport();
    useCardsFinalSaleStore.getState().clearCards();
    useDebtsFinalSaleStore.getState().clearDebts();
    useWorkersFinalSaleStore.getState().clearWorkers();
    useMachineStateFinalSaleStore.getState().clearMachineStates();
    useMachineFinalSaleStore.getState().clearMachines();
  };

  return {
    finalizeReport,
    clearAllReports
  };
};
