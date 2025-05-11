import { FloatingActionButton } from "components/floating-action-button";
import { MyModal } from "components/ui/modals/myModal";
import { DebtItem } from "features/sales/components/step2/debts/debtItem";
import { FormAddDebt } from "features/sales/components/step2/debts/formAddDebt";
import { useDebtsFinalSaleStore } from "features/sales/store/useDebtsFinalSale.store";
import useColors from "hooks/useColors";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Step2Debts() {
  const { debts } = useDebtsFinalSaleStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const defaultColors = useColors();

  return (
    <>
      <MyModal isVisible={isFormVisible} onClose={() => setIsFormVisible(false)} title="Agregar Deuda">
        <FormAddDebt onClose={() => setIsFormVisible(false)} />
      </MyModal>
      <View style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
          Deudas
        </Text>
        {/* Debt List */}
        {debts.length > 0 ? (
          <ScrollView style={{ gap: 10, borderRadius: 10, padding: 2 }}>
            {debts.map((debt) => (
              <DebtItem key={debt.name + debt.total} item={debt} />
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 dark:text-gray-400 text-center">No hay deudas registradas</Text>
          </View>
        )}

        <FloatingActionButton
          onPress={() => setIsFormVisible(true)}
          iconName="add"
          iconSize={24}
          iconColor={defaultColors.text}
          backgroundColor={defaultColors.primary}
          style={{ bottom: 25, right: 5 }}
        />
      </View>
    </>
  );
}
