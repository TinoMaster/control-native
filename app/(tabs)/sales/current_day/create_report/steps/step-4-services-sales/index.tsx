import { ContentWrapper } from "components/ContentWrapper";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { useWorkersFinalSaleStore } from "features/sales/current_day/store/useWorkersFinalSale.store";
import { SaleServiceCard } from "features/sales/sale_services/components/SaleServiceCard";
import { useServiceSale } from "hooks/api/useServiceSale";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import colors from "styles/colors";

export default function Step4ServicesSales() {
  const { serviceSales } = useServiceSale();
  const selectedWorkers = useWorkersFinalSaleStore((state) => state.selectedWorkers);
  const setServicesSales = useDailyReportStore((state) => state.setServicesSales);

  const servicesByWorker = serviceSales?.filter((serviceSale) => {
    return selectedWorkers.some((worker) => worker.id === serviceSale.employee.id) && !serviceSale.businessFinalSale;
  });

  useEffect(() => {
    // Solo actualizar cuando serviceSales o selectedWorkers cambien, no cuando servicesByWorker cambie
    if (serviceSales && selectedWorkers.length > 0) {
      const filteredServices = serviceSales.filter((serviceSale) =>
        selectedWorkers.some((worker) => worker.id === serviceSale.employee.id)
      );
      setServicesSales(filteredServices);
    }
  }, [serviceSales, selectedWorkers, setServicesSales]);

  return (
    <ContentWrapper>
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.darkMode.text.light }} className="text-lg font-semibold">
          Servicios vendidos
        </Text>
        <Text style={{ color: colors.darkMode.textSecondary.light }} className="text-sm">
          Aquí solo se muestran los servicios vendidos por los trabajadores seleccionados que no pertenecen a un reporte
          ya finalizado.
        </Text>
      </View>
      {/* Card List */}
      {servicesByWorker?.length > 0 ? (
        <ScrollView style={{ gap: 10, borderRadius: 10, padding: 2 }}>
          {servicesByWorker?.map((serviceSale) => (
            <SaleServiceCard key={serviceSale.id} saleService={serviceSale} allDetails={false} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text style={{ color: colors.darkMode.text.light }} className="text-center">
            No hay servicios vendidos
          </Text>
        </View>
      )}
    </ContentWrapper>
  );
}
