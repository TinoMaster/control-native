import { ActionButtons } from "components/ActionButtons";
import { ContentWrapper } from "components/ContentWrapper";
import { ErrorState } from "components/ErrorState";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AdditionalInfo } from "features/entries/services/components/service-detail/AdditionalInfo";
import { CostSection } from "features/entries/services/components/service-detail/CostSection";
import { FormEditService } from "features/entries/services/components/service-detail/FormEditService";
import { PrincipalInfo } from "features/entries/services/components/service-detail/PrincipalInfo";
import { useService } from "hooks/api/useServices";
import { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "styles/colors";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { loadingServices, getServiceById, deleteService } = useService();
  const [modalVisible, setModalVisible] = useState(false);

  if (loadingServices) {
    return <LoadingPage message="Cargando detalles del servicio..." />;
  }

  const service = getServiceById(Number(id));

  if (!service) {
    return (
      <ErrorState
        title="Servicio no encontrado"
        message="El servicio que estás buscando no existe o ha sido eliminado."
        actionText="Volver a servicios"
        onAction={() => router.push("/(tabs)/entries/services")}
      />
    );
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
    <GradientBackground>
      {/* Header */}
      <CustomHeader title="Detalles del Servicio" showBackButton />
      <MyScrollView>
        <ContentWrapper>
          {/* Información Principal */}
          <PrincipalInfo service={service} />

          {/* Costos Asociados */}
          <CostSection service={service} />

          {/* Información Adicional */}
          <AdditionalInfo service={service} />
        </ContentWrapper>
      </MyScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            label: "Eliminar",
            onPress: () => onDeleteService(service.id ?? 0),
            color: colors.secondary.light
          },
          {
            icon: "pencil-outline",
            label: "Editar",
            onPress: () => setModalVisible(true),
            color: colors.primary.light
          }
        ]}
        fixed={false}
      />

      <MyModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Editar Información General">
        <FormEditService service={service} setModalVisible={setModalVisible} />
      </MyModal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
