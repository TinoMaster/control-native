import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AdditionalInfo } from "features/business/myBusinesses/businessDetails/AdditionalInfo";
import { AddressInfo } from "features/business/myBusinesses/businessDetails/address/AddressInfo";
import { MachinesInfo } from "features/business/myBusinesses/businessDetails/machines/MachinesInfo";
import { PrincipalInfo } from "features/business/myBusinesses/businessDetails/principal_info/PrincipalInfo";
import { UsersInfo } from "features/business/myBusinesses/businessDetails/users/UsersInfo";
import useColors from "hooks/useColors";
import { ERole } from "models/api";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const defaultColors = useColors();
  const insets = useSafeAreaInsets();

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
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      {/* Header */}
      <BackButtonPlusTitle title="Detalles del Negocio" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20, paddingTop: insets.top + 10 }}
      >
        <View className="flex-1 gap-4">
          <View className="px-4 gap-4">
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
          </View>
        </View>
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
});
