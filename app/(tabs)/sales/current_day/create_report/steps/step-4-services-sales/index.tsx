import { SaleServiceCard } from "features/sales/components/SaleServiceCard";
import { useWorkersFinalSaleStore } from "features/sales/store/useWorkersFinalSale.store";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDailyReportStore } from "features/sales/store/dailyReport.store";

export default function Step4ServicesSales() {
  const { serviceSales } = useServiceSale();
  const selectedWorkers = useWorkersFinalSaleStore((state) => state.selectedWorkers);
  const setServicesSales = useDailyReportStore((state) => state.setServicesSales);
  const defaultColors = useColors();

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
    <View style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
      <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
        Servicios vendidos
      </Text>
      <Text style={{ color: defaultColors.textSecondary }} className=" font-semibold">
        Aquí solo se muestran los servicios vendidos por los trabajadores seleccionados que no pertenecen a un reporte
        ya finalizado.
      </Text>
      {/* Card List */}
      {servicesByWorker?.length > 0 ? (
        <ScrollView style={{ gap: 10, borderRadius: 10, padding: 2 }}>
          {servicesByWorker?.map((serviceSale) => (
            <SaleServiceCard key={serviceSale.id} saleService={serviceSale} allDetails={false} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-center">No hay servicios vendidos</Text>
        </View>
      )}
    </View>
  );
}
