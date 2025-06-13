import { ContentWrapper } from "components/ContentWrapper";
import ExpenseCard from "components/ExpenseCard";
import StatsCard from "components/StatsCard";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { MyScrollView } from "components/ui/MyScrollView";
import { SalesSummaryCard } from "features/home/sales-summary/components/SalesSummaryCard";
import { View } from "react-native";

export default function Dashboard() {
  return (
    <GradientBackground>
      <MyScrollView>
        <ContentWrapper>
          <SalesSummaryCard />
          <ExpenseCard />

          <View
            style={{
              flexDirection: "row",
              gap: 12
            }}
          >
            <StatsCard title="Profit" percentage="53.2%" trend="up" style={{ flex: 1 }} />
            <StatsCard title="Debt" percentage="53.2%" trend="down" style={{ flex: 1 }} />
          </View>
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
