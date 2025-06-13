import { zodResolver } from "@hookform/resolvers/zod";
import GenericInput from "components/forms/generic-input";
import { DebtFormValues, debtSchema } from "models/zod/debt.schema";
import { useDebtsFinalSaleStore } from "features/sales/current_day/store/useDebtsFinalSale.store";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

interface FormAddDebtProps {
  onClose: () => void;
}

export const FormAddDebt = ({ onClose }: FormAddDebtProps) => {
  const { addDebt } = useDebtsFinalSaleStore();
  const { businessId } = useBusinessStore();
  const { employee } = useAuthStore();
  const defaultColors = useColors();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DebtFormValues>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      name: "",
      description: "",
      total: "",
      paid: ""
    }
  });

  const handleAddDebt = useCallback(
    (data: DebtFormValues) => {
      const newDebt: DebtModel = {
        name: data.name,
        description: data.description,
        total: Number(data.total),
        paid: Number(data.paid),
        business: businessId as number,
        employee: employee as EmployeeModel,
        createdAt: new Date()
      };

      addDebt(newDebt);
      reset();
      onClose();
    },
    [addDebt, reset, onClose, employee]
  );

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Nombre"
            placeholder="Nombre del deudor"
            keyboardType="default"
            watch={value}
            error={errors.name}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Descripción (opcional)"
            placeholder="Descripción de la deuda"
            keyboardType="default"
            watch={value}
            error={errors.description}
            onChangeText={onChange}
            multiline={true}
            numberOfLines={3}
          />
        )}
      />

      <Controller
        control={control}
        name="total"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Total de la deuda"
            placeholder="Monto total"
            keyboardType="decimal-pad"
            watch={value}
            error={errors.total}
            onChangeText={(text) => onChange(formatNumericInput(text))}
          />
        )}
      />

      <Controller
        control={control}
        name="paid"
        render={({ field: { onChange, value } }) => (
          <GenericInput
            label="Monto pagado"
            placeholder="Monto pagado"
            keyboardType="decimal-pad"
            watch={value}
            error={errors.paid}
            onChangeText={(text) => onChange(formatNumericInput(text))}
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(handleAddDebt)}
        className="mt-4 p-3 rounded-lg"
        style={{ backgroundColor: defaultColors.primary }}
      >
        <Text className="text-center text-white font-semibold">Guardar Deuda</Text>
      </TouchableOpacity>
    </View>
  );
};
