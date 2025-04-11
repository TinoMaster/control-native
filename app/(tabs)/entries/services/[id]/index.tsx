import { Ionicons } from "@expo/vector-icons";
import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import LoadingPage from "components/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useService } from "hooks/api/useServices";
import useColors from "hooks/useColors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "styles/colors";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const defaultColors = useColors();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { loadingServices, getServiceById, deleteService } = useService();

  if (loadingServices) {
    return <LoadingPage message="Cargando detalles del servicio..." />;
  }

  const service = getServiceById(Number(id));

  if (!service) {
    showNotification("Servicio no encontrado", "error");
    router.back();
    return null;
  }

  const onDeleteService = (serviceId: number) => {
    deleteService(serviceId, {
      onSuccess: () => {
        showNotification("Servicio eliminado", "success");
        router.back();
      },
      onError: () => {
        showNotification("Error al eliminar el servicio", "error");
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <BackButtonPlusTitle title="Detalles del Servicio" />

        {/* Información Principal */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <Text style={[styles.serviceName, { color: defaultColors.text }]}>{service.name}</Text>
          <Text style={[styles.price, { color: defaultColors.primary }]}>${service.price.toFixed(2)}</Text>
          {Boolean(service.description) && (
            <Text style={[styles.description, { color: defaultColors.textSecondary }]}>{service.description}</Text>
          )}
        </View>

        {/* Información del Negocio */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información del Negocio</Text>
          </View>
          <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
            ID del Negocio: {service.business}
          </Text>
        </View>

        {/* Costos Asociados */}
        {service.costs && service.costs.length > 0 && (
          <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cash-outline" size={24} color={defaultColors.primary} />
              <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>
                Costos Asociados ({service.costs.length})
              </Text>
            </View>
            {service.costs.map((cost) => (
              <View key={cost.id} style={styles.costItem}>
                <Text style={[styles.costName, { color: defaultColors.text }]}>{cost.consumable.name}</Text>
                <Text style={[styles.costAmount, { color: defaultColors.primary }]}>
                  {cost.quantity} x ${cost.consumable.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Información Adicional */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información Adicional</Text>
          </View>
          {service.createdAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Creado: {new Date(service.createdAt).toLocaleDateString()}
            </Text>
          )}
          {service.updatedAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Última actualización: {new Date(service.updatedAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            label: "Eliminar",
            onPress: () => onDeleteService(service.id ?? 0),
            color: colors.secondary.light
          }
        ]}
        fixed={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    lineHeight: 24
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8
  },
  costItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)"
  },
  costName: {
    fontSize: 16
  },
  costAmount: {
    fontSize: 16,
    fontWeight: "500"
  }
});
