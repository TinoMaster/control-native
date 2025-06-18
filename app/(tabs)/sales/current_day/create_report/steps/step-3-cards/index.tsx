import { ContentWrapper } from "components/ContentWrapper";
import { FloatingActionButton } from "components/floating-action-button";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { CardItem } from "features/sales/current_day/components/step3/cards/cardItem";
import { FormAddCard } from "features/sales/current_day/components/step3/cards/formAddCard";
import { useCardsFinalSaleStore } from "features/sales/current_day/store/useCardsFinalSale.store";
import useColors from "hooks/useColors";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Step3Cards() {
  const { cards } = useCardsFinalSaleStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const defaultColors = useColors();

  return (
    <ContentWrapper withFooter>
      <MyModal
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        title="Agregar Tarjeta"
      >
        <FormAddCard onClose={() => setIsFormVisible(false)} />
      </MyModal>
      <View style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
        <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
          Tarjetas
        </Text>
        {/* Card List */}
        {cards.length > 0 ? (
          <MyScrollView style={{ gap: 10 }}>
            {cards.map((card) => (
              <CardItem key={card.id} item={card} />
            ))}
          </MyScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text style={{ color: defaultColors.text }} className="text-center">
              No hay tarjetas registradas
            </Text>
          </View>
        )}

        <FloatingActionButton onPress={() => setIsFormVisible(true)} iconName="add" iconSize={24} />
      </View>
    </ContentWrapper>
  );
}
