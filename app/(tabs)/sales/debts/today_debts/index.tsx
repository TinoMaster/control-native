import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { DebtCard } from "features/sales/debts/components/DebtCard";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import colors from "styles/colors";

export default function TodayDebts() {
  const defaultColors = useColors();
  const router = useRouter();
  const { getDebtsInActualDay, loadingDebts } = useDebts();

  const renderDebt = (debt: DebtModel) => <DebtCard debt={debt} />;

  if (loadingDebts) {
    return <LoadingPage />;
  }
  return (
    <GradientBackground>
      <GenericList
        data={getDebtsInActualDay()}
        renderItem={renderDebt}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay deudas registradas"
        withHeader={false}
      />

      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/debts/today_debts/create" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </GradientBackground>
  );
}
