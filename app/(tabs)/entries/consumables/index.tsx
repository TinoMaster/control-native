import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import ConsumableCard from "features/entries/consumables/ConsumableCard";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { StyleSheet } from "react-native";
import colors from "styles/colors";

export default function ConsumablesScreen() {
  const defaultColors = useColors();
  const router = useRouter();
  const { consumables, loadingConsumables } = useConsumables();

  const renderConsumable = (consumable: ConsumableModel) => (
    <ConsumableCard
      consumable={consumable}
      onPress={() => {
        if (consumable.id) {
          router.push(`/(tabs)/entries/consumables/${consumable.id}` as any);
        }
      }}
    />
  );

  if (loadingConsumables) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <CustomHeader title="Insumos" />
      <GenericList
        data={consumables}
        renderItem={renderConsumable}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay insumos registrados"
      />
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/entries/consumables/create" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
