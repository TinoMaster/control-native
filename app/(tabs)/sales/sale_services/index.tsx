import { ContentWrapper } from "components/ContentWrapper";
import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { PageTitle } from "components/PageTitle";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { SaleServiceCard } from "features/sales/sale_services/components/SaleServiceCard";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import colors from "styles/colors";

export default function SaleServices() {
  const defaultColors = useColors();
  const router = useRouter();
  const { serviceSales, loadingServiceSales } = useServiceSale();

  const renderSaleService = (saleService: ServiceSaleModel) => <SaleServiceCard saleService={saleService} />;

  if (loadingServiceSales) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <PageTitle title="Ventas de servicios" />
      <ContentWrapper>
        <GenericList
          data={serviceSales ?? []}
          renderItem={renderSaleService}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          emptyListMessage="No hay ventas de servicios registradas"
        />
      </ContentWrapper>
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/sale_services/create_service_sale" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </GradientBackground>
  );
}
