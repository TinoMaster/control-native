import BalanceCard from "components/BalanceCard";
import ExpenseCard from "components/ExpenseCard";
import StatsCard from "components/StatsCard";
import { MyScrollView } from "components/ui/MyScrollView";
import { SalesSummaryCard } from "features/home/sales-summary/components/SalesSummaryCard";
import useColors from "hooks/useColors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const colors = useColors();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <MyScrollView>
        <SalesSummaryCard />
        <ExpenseCard />

        <BalanceCard />

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 20
          }}
        >
          <StatsCard title="Profit" percentage="53.2%" trend="up" style={{ flex: 1 }} />
          <StatsCard title="Debt" percentage="53.2%" trend="down" style={{ flex: 1 }} />
        </View>
      </MyScrollView>
    </SafeAreaView>
  );
}
