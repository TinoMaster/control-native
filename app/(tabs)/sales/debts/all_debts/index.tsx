import { FloatingActionButton } from "components/floating-action-button";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { DebtCard } from "features/sales/debts/components/DebtCard";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { SectionList, StyleSheet, Text, View } from "react-native";
import colors from "styles/colors";
import { organizeSectionedDebts } from "utilities/formatters";

export default function AllDebts() {
  const defaultColors = useColors();
  const router = useRouter();
  const { debts, loadingDebts } = useDebts();

  const renderDebt = (debt: DebtModel) => <DebtCard debt={debt} />;

  if (loadingDebts) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <SectionList
        sections={organizeSectionedDebts(debts)}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        renderItem={({ item }) => renderDebt(item)}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: defaultColors.text }]}>
              No hay deudas registradas
            </Text>
          </View>
        }
      />

      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/debts/today_debts/create" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 100,
    paddingHorizontal: 16,
    gap: 10
  },
  sectionHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center"
  }
});
