import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { PageTitle } from "components/PageTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { DebtCard } from "features/sales/debts/components/DebtCard";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { StyleSheet, View } from "react-native";
import colors from "styles/colors";

export default function DebtsScreen() {
  const defaultColors = useColors();
  const router = useRouter();
  const { getDebtsInActualDay, loadingDebts } = useDebts();

  const renderDebt = (debt: DebtModel) => <DebtCard debt={debt} />;

  if (loadingDebts) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Deudas" />
      <GenericList
        data={getDebtsInActualDay()}
        renderItem={renderDebt}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay deudas registradas"
      />
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/debts/create_debt" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
