import { ActionButtons } from "components/ActionButtons";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AdditionalInfo } from "features/entries/consumables/consumable-detail/AdditionalInfo";
import { FormEditConsumable } from "features/entries/consumables/consumable-detail/FormEditConsumable";
import { PrincipalInfo } from "features/entries/consumables/consumable-detail/PrincipalInfo";
import { StockSection } from "features/entries/consumables/consumable-detail/StockSection";
import { useConsumables } from "hooks/api/useConsumables";
import { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "styles/colors";

export default function ConsumableDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { consumables, loadingConsumables, onDeleteConsumable, deletingConsumable, updatingConsumable } =
    useConsumables();
  const [modalVisible, setModalVisible] = useState(false);

  if (loadingConsumables || deletingConsumable || updatingConsumable) {
    return <LoadingPage message="Cargando detalles del insumo..." />;
  }

  const consumable = consumables.find((c) => c.id === Number(id));

  if (!consumable) {
    showNotification("Insumo no encontrado", "error");
    router.back();
    return null;
  }

  const handleDeleteConsumable = (consumableId: number) => {
    onDeleteConsumable(consumableId);
  };

  return (
    <GradientBackground>
      {/* Header */}
      <CustomHeader title="Detalles del Insumo" showBackButton />
      <MyScrollView>
        <ContentWrapper>
          {/* Información Principal */}
          <PrincipalInfo consumable={consumable} />

          {/* Información de Stock */}
          <StockSection consumable={consumable} />

          {/* Información Adicional */}
          <AdditionalInfo consumable={consumable} />
        </ContentWrapper>
      </MyScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            label: "Eliminar",
            onPress: () => handleDeleteConsumable(consumable.id ?? 0),
            color: colors.background.dark.secondary
          },
          {
            icon: "pencil-outline",
            label: "Editar",
            onPress: () => setModalVisible(true),
            color: colors.background.dark.secondary
          }
        ]}
        fixed={false}
      />

      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Información General">
        <FormEditConsumable setModalVisible={setModalVisible} consumable={consumable} />
      </MyModal>
    </GradientBackground>
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
    borderRadius: 12
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
