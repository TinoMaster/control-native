import useColors from "hooks/useColors";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GenericList from "components/GenericList";
import { ServiceModel } from "models/api/service.model";
import { useRouter } from "expo-router";
import { useService } from "hooks/api/useServices";
import LoadingPage from "components/LoadingPage";
import ServiceCard from "components/ServiceCard";
import colors from "styles/colors";

export default function ServicesScreen() {
  const defaultColors = useColors();
  const router = useRouter();
  const { services, loadingServices } = useService();

  const renderService = (service: ServiceModel) => (
    <ServiceCard
      service={service}
      onPress={() => {
        if (service.id) {
          router.push(`/(tabs)/entries/services/${service.id}` as any);
        }
      }}
    />
  );

  if (loadingServices) {
    return <LoadingPage />;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: defaultColors.background }]}
    >
      <GenericList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id?.toString() || ""}
        emptyListMessage="No hay servicios registrados"
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: defaultColors.primary }]}
        onPress={() => router.push("/(tabs)/entries/services/create" as any)}
      >
        <Ionicons name="add" size={28} color={colors.darkMode.text.light} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serviceItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  servicePrice: {
    fontSize: 16,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
