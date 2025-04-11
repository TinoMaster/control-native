import { Ionicons } from "@expo/vector-icons";
import ConsumableCard from "components/ConsumableCard";
import GenericList from "components/GenericList";
import LoadingPage from "components/LoadingPage";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Insumos" />
      <GenericList
        data={consumables}
        renderItem={renderConsumable}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay insumos registrados"
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: defaultColors.primary }]}
        onPress={() => router.push("/(tabs)/entries/consumables/create" as any)}
      >
        <Ionicons name="add" size={28} color={colors.darkMode.text.light} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  serviceItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  servicePrice: {
    fontSize: 16
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
});
