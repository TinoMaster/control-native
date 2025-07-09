import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { useDebtPayments } from "hooks/api/useDebtPayments";
import useColors from "hooks/useColors";
import { DebtPaymentModel } from "models/api/debtPayment.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { formatCurrency } from "utilities/formatters";
import { formatNumericInput } from "utilities/helpers/globals.helpers";
import { z } from "zod";

const debtPaymentSchema = z.object({
  amount: z.number().min(1, "El monto debe ser mayor a cero"),
  comment: z.string().optional()
});

type DebtPaymentFormData = z.infer<typeof debtPaymentSchema>;

interface Props {
  debtId: number;
  remainingAmount: number;
  onClose: () => void;
}

export const FormAddDebtPayment = ({ debtId, remainingAmount, onClose }: Props) => {
  const defaultColors = useColors();
  const { saveDebtPayment } = useDebtPayments({ debtId });
  const employeeId = useAuthStore((state) => state.employee?.id);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<DebtPaymentFormData>({
    resolver: zodResolver(debtPaymentSchema),
    defaultValues: {
      amount: 0,
      comment: ""
    }
  });

  const onSubmit = (data: DebtPaymentFormData) => {
    console.log(data);
    const payment: DebtPaymentModel = {
      debtId,
      amount: Number(data.amount),
      employeeId: Number(employeeId),
      comment: data.comment || undefined
    };

    saveDebtPayment(payment);
    onClose();
  };

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            placeholder="Monto"
            icon="$"
            value={value.toString()}
            onChangeText={(text) => {
              const formattedValue = formatNumericInput(text, remainingAmount);
              onChange(Number(formattedValue));
            }}
            error={errors.amount?.message}
            keyboardType="numeric"
            comment={`Saldo pendiente: ${formatCurrency(remainingAmount)}`}
          />
        )}
      />

      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            placeholder="Comentario (opcional)"
            icon="📝"
            value={value}
            onChangeText={onChange}
            error={errors.comment?.message}
          />
        )}
      />

      <View className="flex-row justify-end">
        <Pressable
          onPress={onClose}
          className="py-2 px-4 rounded-lg mr-2"
          style={{ backgroundColor: defaultColors.card }}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="py-2 px-4 rounded-lg"
          style={{ backgroundColor: defaultColors.primary }}
        >
          <Text className="text-white">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
};
