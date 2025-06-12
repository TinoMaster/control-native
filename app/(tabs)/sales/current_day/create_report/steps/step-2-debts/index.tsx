import { ContentWrapper } from "components/ContentWrapper";
import { FloatingActionButton } from "components/floating-action-button";
import { MyModal } from "components/ui/modals/myModal";
import { DebtItem } from "features/sales/current_day/components/step2/debts/debtItem";
import { FormAddDebt } from "features/sales/current_day/components/step2/debts/formAddDebt";
import { useDebtsFinalSaleStore } from "features/sales/current_day/store/useDebtsFinalSale.store";
import { useWorkersFinalSaleStore } from "features/sales/current_day/store/useWorkersFinalSale.store";
import { useDebts } from "hooks/api/useDebts";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import colors from "styles/colors";

export default function Step2Debts() {
  const { debts, addDebts } = useDebtsFinalSaleStore();
  const { getDebtsInActualDay } = useDebts();
  const selectedWorkers = useWorkersFinalSaleStore((state) => state.selectedWorkers);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    addDebts(
      getDebtsInActualDay()?.filter((debt) => {
        return selectedWorkers.some((worker) => worker.id === debt.employee.id && !debt.businessFinalSale);
      }) ?? []
    );
  }, []);

  return (
    <ContentWrapper>
      <MyModal isVisible={isFormVisible} onClose={() => setIsFormVisible(false)} title="Agregar Deuda">
        <FormAddDebt onClose={() => setIsFormVisible(false)} />
      </MyModal>
      <View style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
        <Text style={{ color: colors.darkMode.text.light }} className="text-lg font-semibold">
          Deudas
        </Text>
        {/* Debt List */}
        {debts?.length > 0 ? (
          <ScrollView style={{ gap: 10, borderRadius: 10, padding: 2 }}>
            {debts.map((debt) => (
              <DebtItem key={debt.name + debt.total} item={debt} />
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text style={{ color: colors.darkMode.text.light }} className="text-center">
              No hay deudas registradas
            </Text>
          </View>
        )}

        <FloatingActionButton
          onPress={() => setIsFormVisible(true)}
          iconName="add"
          iconSize={24}
          iconColor={colors.darkMode.text.light}
        />
      </View>
    </ContentWrapper>
  );
}
