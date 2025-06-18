import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import { CustomInput } from "components/ui/inputs/CustomInput";
import {
  CardFormValues,
  cardSchema
} from "features/sales/current_day/schema/cardsFinalSale.schema";
import { useCardsFinalSaleStore } from "features/sales/current_day/store/useCardsFinalSale.store";
import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

interface FormAddCardProps {
  readonly onClose: () => void;
}

export function FormAddCard({ onClose }: FormAddCardProps) {
  const { addCard } = useCardsFinalSaleStore();
  const defaultColors = useColors();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardType: "",
      cardNumber: "",
      amount: "",
      reference: ""
    }
  });

  const handleAddCard = useCallback(
    (data: CardFormValues) => {
      const newCard: CardPayment = {
        id: Date.now().toString(),
        cardNumber: data.cardNumber,
        amount: Number(data.amount)
      };

      addCard(newCard);
      reset();
      onClose();
    },
    [addCard, reset, onClose]
  );

  return (
    <ContentWrapper withHeader={false} style={{ flex: 0 }}>
      <View style={{ gap: 3 }}>
        <Controller
          control={control}
          name="cardType"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Tipo de tarjeta"
              placeholder="Visa, Mastercard, etc."
              keyboardType="default"
              value={value}
              error={errors?.cardType?.message}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Últimos 4 dígitos"
              placeholder="Últimos 4 dígitos de la tarjeta"
              keyboardType="number-pad"
              value={value}
              error={errors?.cardNumber?.message}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Monto"
              placeholder="Monto pagado con tarjeta"
              keyboardType="decimal-pad"
              value={value}
              error={errors?.amount?.message}
              onChangeText={(text) => onChange(formatNumericInput(text))}
            />
          )}
        />

        <Controller
          control={control}
          name="reference"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Referencia (opcional)"
              placeholder="Número de referencia o autorización"
              keyboardType="default"
              value={value}
              error={errors?.reference?.message}
              onChangeText={onChange}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleAddCard)}
          className="mt-4 p-3 rounded-lg"
          style={{ backgroundColor: defaultColors.primary }}
        >
          <Text className="text-center text-white font-semibold">Guardar Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </ContentWrapper>
  );
}
