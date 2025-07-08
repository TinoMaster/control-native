import useColors from "hooks/useColors";
import { DebtPaymentModel } from "models/api/debtPayment.model";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { formatCurrency } from "utilities/formatters";

interface Props {
  debtId: number;
  remainingAmount: number;
  onSave: (payment: DebtPaymentModel) => void;
  onClose: () => void;
}

export const FormAddDebtPayment = ({ debtId, remainingAmount, onSave, onClose }: Props) => {
  const defaultColors = useColors();
  const [amount, setAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const employeeId = useAuthStore((state) => state.employee?.id);

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "El monto debe ser mayor a cero");
      return;
    }

    if (parseFloat(amount) > remainingAmount) {
      Alert.alert("Error", "El monto no puede ser mayor al saldo pendiente");
      return;
    }

    const payment: DebtPaymentModel = {
      debtId,
      amount: parseFloat(amount),
      employeeId: Number(employeeId),
      comment: comment || undefined
    };

    onSave(payment);
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Monto del pago
        </Text>
        <View
          className="flex-row items-center p-3 rounded-lg border"
          style={{ borderColor: defaultColors.primary }}
        >
          <Text style={{ color: defaultColors.text }} className="mr-2">
            $
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={defaultColors.textSecondary}
            style={{ color: defaultColors.text, flex: 1 }}
          />
        </View>
        <Text style={{ color: defaultColors.textSecondary }} className="mt-1 text-xs">
          Saldo pendiente: {formatCurrency(remainingAmount)}
        </Text>
      </View>

      <View className="mb-6">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Comentario (opcional)
        </Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Agregar un comentario"
          placeholderTextColor={defaultColors.textSecondary}
          multiline
          numberOfLines={3}
          className="p-3 rounded-lg border"
          style={{
            borderColor: defaultColors.primary,
            color: defaultColors.text,
            textAlignVertical: "top"
          }}
        />
      </View>

      <View className="flex-row justify-end">
        <Pressable
          onPress={onClose}
          className="py-2 px-4 rounded-lg mr-2"
          style={{ backgroundColor: defaultColors.card }}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          className="py-2 px-4 rounded-lg"
          style={{ backgroundColor: defaultColors.primary }}
        >
          <Text className="text-white">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
};
