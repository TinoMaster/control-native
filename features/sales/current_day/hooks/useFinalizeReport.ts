import { useRouter } from "expo-router";
import { useHomeSalesResume } from "features/home/sales-summary/hooks/useHomeSalesResume";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { useDailySales } from "hooks/api/useDailySales";
import { useDebts } from "hooks/api/useDebts";
import { useServiceSale } from "hooks/api/useServiceSale";
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
import { useCardsFinalSaleStore } from "../store/useCardsFinalSale.store";
import { useDebtsFinalSaleStore } from "../store/useDebtsFinalSale.store";
import { useMachineFinalSaleStore } from "../store/useMachineFinalSale.store";
import { useMachineStateFinalSaleStore } from "../store/useMachineStateFinalSale.store";
import { useWorkersFinalSaleStore } from "../store/useWorkersFinalSale.store";

export const useFinalizeReport = () => {
  const { saveDailyReport, loadingSave } = useDailySales();
  const { refetchSalesResume } = useHomeSalesResume();
  const { refetchServiceSales } = useServiceSale();
  const { refetchDebts } = useDebts();
  const { businessId, business } = useBusinessStore();
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  /* Refetch service sales y sales resume para que se actualicen los datos, en este caso
      para que detecte si las ventas de servicios pertenecen a un reporte finalizado o 
      en la pagina de inicio se actualice el resumen de ventas */
  const refreshDependingData = () => {
    refetchServiceSales();
    refetchSalesResume();
    refetchDebts();
  };

  const finalizeReport = (report: BusinessFinalSaleModel, cards: CardPayment[], machineStates: MachineStateModel[]) => {
    const cardsToSave: CardModel[] = cards.map((card) => ({
      number: card.cardNumber,
      amount: card.amount
    }));

    const machinesToSave: MachineModel[] =
      report.machines.length > 0 ? business.machines?.filter((m) => report.machines.includes(m.id!)) || [] : [];

    const totalDebts = report.debts?.reduce((acc, debt) => acc + (debt.total - debt.paid), 0) ?? 0;

    const reportsToSave: BusinessFinalSaleModelToCreate = {
      ...report,
      name: `Reporte ${business.name} ${new Date().toLocaleDateString()}`,
      paid: report.total - totalDebts,
      business: businessId!,
      cards: cardsToSave,
      machines: machinesToSave,
      doneBy: user?.id!,
      machineStates: machineStates,
      createdAt: new Date(),
      updatedAt: new Date(),
      debts: report.debts ?? []
    };

    saveDailyReport(reportsToSave, {
      onSuccess: (response) => {
        if (response.status === 200) {
          clearAllReports();
          refreshDependingData();
          router.replace("/(tabs)/sales/current_day");
        }
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
    clearAllReports,
    loadingSave
  };
};
