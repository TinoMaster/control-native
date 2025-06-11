import { MaterialIcons } from "@expo/vector-icons";
import { PageTitle } from "components/PageTitle";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { AuthBusinessCard } from "features-admin/businesses/authorizations/components/AuthBusinessCard";
import { useAuthRequests } from "features-admin/businesses/authorizations/hooks/useAuthRequests";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export default function Authorizations() {
  const defaultColors = useColors();
  const {
    authRequests,
    loadingAuthRequests,
    approveBusiness,
    loadingApproveBusiness,
    rejectBusiness,
    loadingRejectBusiness
  } = useAuthRequests();
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleApprove = (business: BusinessModel) => {
    setProcessingId(business.id ?? null);
    approveBusiness(business.owner?.toString() ?? "");
  };

  const handleReject = (business: BusinessModel) => {
    setProcessingId(business.id ?? null);
    rejectBusiness(business.owner?.toString() ?? "");
  };

  if (loadingAuthRequests) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <PageTitle title="Autorizaciones" icon="shield-checkmark-outline" />

      <View style={styles.container}>
        {authRequests && authRequests.length > 0 ? (
          <FlatList
            data={authRequests}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <AuthBusinessCard
                business={item}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={processingId === item.id && (loadingApproveBusiness || loadingRejectBusiness)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="business-center"
              size={64}
              color={adjustBrightness(defaultColors.textSecondary, -20)}
            />
            <Text style={[styles.emptyText, { color: defaultColors.textSecondary }]} className="text-center mt-4">
              No hay solicitudes de autorización pendientes
            </Text>
          </View>
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  listContent: {
    paddingBottom: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    maxWidth: "80%"
  }
});
