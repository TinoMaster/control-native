import { ActionButtons } from "components/ActionButtons";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyScrollView } from "components/ui/MyScrollView";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AdditionalInfo } from "features/business/myBusinesses/businessDetails/AdditionalInfo";
import { AddressInfo } from "features/business/myBusinesses/businessDetails/address/AddressInfo";
import { MachinesInfo } from "features/business/myBusinesses/businessDetails/machines/MachinesInfo";
import { PrincipalInfo } from "features/business/myBusinesses/businessDetails/principal_info/PrincipalInfo";
import { UsersInfo } from "features/business/myBusinesses/businessDetails/users/UsersInfo";
import { ERole } from "models/api";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";

export default function BusinessDetails() {
  const { id } = useLocalSearchParams();
  const { loading: loadingBusinesses, getBusinessById } = useBusinessStore();
  const { showNotification } = useNotification();
  const { role } = useAuthStore();

  const business = getBusinessById(Number(id));
  const router = useRouter();

  if (loadingBusinesses) {
    return <LoadingPage message="Cargando detalles del negocio..." />;
  }

  if (!business) {
    showNotification("Negocio no encontrado", "error");
    router.back();
    return null;
  }

  const handleDeleteBusiness = () => {
    // Implementar lógica para eliminar el negocio
    showNotification("Esta funcionalidad será implementada próximamente", "info");
  };

  return (
    <GradientBackground>
      {/* Header */}
      <CustomHeader title="Detalles del Negocio" showBackButton />

      <MyScrollView>
        <ContentWrapper>
          {/* Información Principal */}
          <PrincipalInfo business={business} />

          {/* Dirección */}
          <AddressInfo business={business} />

          {/* Máquinas */}
          <MachinesInfo business={business} />

          {/* Usuarios */}
          <UsersInfo business={business} />

          {/* Información Adicional */}
          <AdditionalInfo business={business} />
        </ContentWrapper>
      </MyScrollView>

      {/* Botones de Acción */}
      {role === ERole.OWNER && (
        <ActionButtons
          fixed
          buttons={[
            {
              icon: "trash-outline",
              label: "Eliminar",
              onPress: handleDeleteBusiness,
              color: colors.secondary.light
            }
          ]}
        />
      )}
    </GradientBackground>
  );
}
