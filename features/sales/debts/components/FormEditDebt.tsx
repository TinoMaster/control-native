import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";
import { z } from "zod";

interface FormEditDebtProps {
  readonly debt: DebtModel;
  readonly setModalVisible: (visible: boolean) => void;
}

const debtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  total: z.number().min(0.01, "El total debe ser mayor a 0"),
  paid: z.number().min(0, "El pago no puede ser negativo")
});

type DebtFormData = z.infer<typeof debtSchema>;

export function FormEditDebt({ debt, setModalVisible }: FormEditDebtProps) {
  const defaultColors = useColors();
  const { updateDebt, loadingUpdate } = useDebts();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<DebtFormData>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      name: debt.name,
      description: debt.description ?? "",
      total: debt.total,
      paid: debt.paid
    }
  });

  const onSubmit = (data: DebtFormData) => {
    if (debt.id) {
      const updatedDebt: DebtModel = {
        ...debt,
        ...data
      };

      updateDebt(updatedDebt);
      setModalVisible(false);
    } else {
      showNotification("No se pudo actualizar la deuda", "error");
    }
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Text className="mb-1 font-medium" style={{ color: defaultColors.text }}>
          Nombre
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border rounded-md p-2"
              style={{
                borderColor: defaultColors.primary,
                color: defaultColors.text,
                backgroundColor: defaultColors.background
              }}
              placeholder="Nombre de la deuda"
              placeholderTextColor={defaultColors.textSecondary}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && (
          <Text className="text-sm mt-1" style={{ color: colors.error.dark }}>
            {errors.name.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="mb-1 font-medium" style={{ color: defaultColors.text }}>
          Descripción (opcional)
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border rounded-md p-2"
              style={{
                borderColor: defaultColors.primary,
                color: defaultColors.text,
                backgroundColor: defaultColors.background
              }}
              placeholder="Descripción de la deuda"
              placeholderTextColor={defaultColors.textSecondary}
              value={value ?? ""}
              onChangeText={onChange}
              multiline
              numberOfLines={3}
            />
          )}
        />
      </View>

      <View className="flex-row justify-end mt-4">
        <TouchableOpacity
          className="px-4 py-2 rounded-md mr-2"
          style={{ backgroundColor: defaultColors.background }}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: defaultColors.primary }}
          onPress={handleSubmit(onSubmit)}
          disabled={loadingUpdate}
        >
          {loadingUpdate ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ color: "#ffffff" }}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
