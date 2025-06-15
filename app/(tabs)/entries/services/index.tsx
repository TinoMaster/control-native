import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import ServiceCard from "features/entries/services/components/ServiceCard";
import { useService } from "hooks/api/useServices";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api/service.model";
import { StyleSheet } from "react-native";
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
    <GradientBackground>
      <CustomHeader title="Servicios" />
      <GenericList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay servicios registrados"
      />

      <FloatingActionButton
        onPress={() => router.push("/(tabs)/entries/services/create" as any)}
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
