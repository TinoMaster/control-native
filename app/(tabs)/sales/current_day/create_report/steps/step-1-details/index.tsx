import { ContentWrapper } from "components/ContentWrapper";
import { MyCard } from "components/ui/cards/MyCard";
import { MyScrollView } from "components/ui/MyScrollView";
import { MachinesSelection } from "features/sales/current_day/components/step1/machines";
import { MoneyDetails } from "features/sales/current_day/components/step1/moneyDetails";
import { Workers } from "features/sales/current_day/components/step1/workers";

export default function Step1Details() {
  return (
    <MyScrollView>
      <ContentWrapper withFooter style={{ paddingTop: 80 }}>
        <MyCard title="Detalles Monetarios">
          <MoneyDetails />
        </MyCard>

        <MyCard header={false}>
          <MachinesSelection />
        </MyCard>

        <MyCard header={false}>
          <Workers />
        </MyCard>
      </ContentWrapper>
    </MyScrollView>
  );
}
