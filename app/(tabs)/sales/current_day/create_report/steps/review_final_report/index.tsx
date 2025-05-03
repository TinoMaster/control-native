import { Text, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";

export default function ReviewFinalReport() {
  const report = useDailyReportStore((state) => state.report);
  return (
    <View>
      <Text>Review Final Report</Text>
    </View>
  );
}
