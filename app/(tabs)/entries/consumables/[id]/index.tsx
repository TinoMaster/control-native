import { Ionicons } from "@expo/vector-icons";
import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { EUnit, TRANSLATE_UNIT } from "models/unit.model";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "styles/colors";
import { shadowStyles } from "styles/shadows";

export default function ConsumableDetailScreen() {
  const { id } = useLocalSearchParams();
  const defaultColors = useColors();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { consumables, loadingConsumables, onDeleteConsumable } = useConsumables();

  if (loadingConsumables) {
    return <LoadingPage message="Cargando detalles del insumo..." />;
  }

  const consumable = consumables.find((c) => c.id === Number(id));

  if (!consumable) {
    showNotification("Insumo no encontrado", "error");
    router.back();
    return null;
  }

  const handleDeleteConsumable = (consumableId: number) => {
    onDeleteConsumable(consumableId, {
      onSuccess: () => {
        showNotification("Insumo eliminado", "success");
        router.back();
      },
      onError: () => {
        showNotification("Error al eliminar el insumo", "error");
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <BackButtonPlusTitle title="Detalles del Insumo" />

        {/* Información Principal */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <Text style={[styles.consumableName, { color: defaultColors.text }]}>{consumable.name}</Text>
          <View style={styles.priceUnitContainer}>
            <Text style={[styles.price, { color: defaultColors.primary }]}>${consumable.price.toFixed(2)}</Text>
            <Text style={[styles.unit, { color: defaultColors.textSecondary }]}>
              / {TRANSLATE_UNIT[consumable.unit as EUnit]}
            </Text>
          </View>
          {Boolean(consumable.description) && (
            <Text style={[styles.description, { color: defaultColors.textSecondary }]}>{consumable.description}</Text>
          )}
        </View>

        {/* Información de Stock */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información de Stock</Text>
          </View>
          <View style={styles.stockInfo}>
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Cantidad disponible: {consumable.stock} {TRANSLATE_UNIT[consumable.unit as EUnit]}
            </Text>
          </View>
        </View>

        {/* Información del Negocio */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información del Negocio</Text>
          </View>
          <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
            ID del Negocio: {consumable.business}
          </Text>
        </View>

        {/* Información Adicional */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información Adicional</Text>
          </View>
          {consumable.createdAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Creado: {new Date(consumable.createdAt).toLocaleDateString()}
            </Text>
          )}
          {consumable.updatedAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Última actualización: {new Date(consumable.updatedAt).toLocaleDateString()}
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
            onPress: () => handleDeleteConsumable(consumable.id ?? 0),
            color: colors.secondary.light
          }
        ]}
        fixed={false}
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
    ...shadowStyles.card
  },
  consumableName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  priceUnitContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16
  },
  price: {
    fontSize: 20,
    fontWeight: "600"
  },
  unit: {
    fontSize: 16,
    marginLeft: 4
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
  stockInfo: {
    paddingVertical: 8
  }
});
