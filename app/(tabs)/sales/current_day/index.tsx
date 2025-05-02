import { DailyReportCard } from "features/sales/components/dailyReportCard";
import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { StyleSheet, View } from "react-native";
import colors from "styles/colors";

export default function CurrentDay() {
  const defaultColors = useColors();
  const router = useRouter();
  const { todayReports, loadingTodayReports } = useBusinessFinalSale();

  const renderTodayReport = (report: BusinessFinalSaleModelResponse) => (
    <DailyReportCard
      report={report}
      onPress={() => {
        if (report.id) {
          router.push(`/(tabs)/sales/current_day/${report.id}` as any);
        }
      }}
    />
  );

  if (loadingTodayReports) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Cuadres del dia" />
      <GenericList
        data={todayReports ?? []}
        renderItem={renderTodayReport}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay reportes registrados en el dia de hoy"
      />
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/sales/current_day/create_report" as any)}
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
