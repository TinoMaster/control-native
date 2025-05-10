import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { PageTitle } from "components/PageTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { DailyReportCard } from "features/sales/components/dailyReportCard";
import { QueryTypeBusinessFinalSale, useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { StyleSheet, View } from "react-native";
import colors from "styles/colors";

export default function CurrentDay() {
  const defaultColors = useColors();
  const router = useRouter();

  const { reports, loadingReports } = useBusinessFinalSale(QueryTypeBusinessFinalSale.DAILY);

  const renderReport = (report: BusinessFinalSaleModelResponse) => (
    <DailyReportCard
      report={report}
      onPress={() => {
        if (report.id) {
          router.push(`/(tabs)/sales/${report.id}` as any);
        }
      }}
    />
  );

  if (loadingReports) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Cuadres del día" />

      <GenericList
        data={reports ?? []}
        renderItem={renderReport}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage={"No hay reportes registrados en el día de hoy"}
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
