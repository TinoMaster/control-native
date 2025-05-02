import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { PageTitle } from "components/PageTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { StyleSheet, View } from "react-native";
import colors from "styles/colors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { SaleServiceCard } from "features/sales/components/SaleServiceCard";

export default function SaleServices() {
  const defaultColors = useColors();
  const router = useRouter();
  const { serviceSales, loadingServiceSales } = useServiceSale();

  const renderSaleService = (saleService: ServiceSaleModel) => (
    <SaleServiceCard
      saleService={saleService}
      onPress={() => {
        if (saleService.id) {
          router.push(`/(tabs)/sales/sale_services/${saleService.id}` as any);
        }
      }}
    />
  );

  if (loadingServiceSales) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Ventas de servicios" />
      <GenericList
        data={serviceSales ?? []}
        renderItem={renderSaleService}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay ventas de servicios registradas"
      />
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/sale_services/create_service_sale" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
