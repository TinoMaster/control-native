import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { z } from "zod";

const debtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  total: z.number().min(0.01, "El total debe ser mayor a 0"),
  paid: z.number().min(0, "El pago no puede ser negativo")
});

type DebtFormData = z.infer<typeof debtSchema>;

export function CreateDebtForm() {
  const defaultColors = useColors();
  const { saveDebt, loadingSave } = useDebts();
  const employee = useAuthStore((state) => state.employee);
  const { showNotification } = useNotification();
  const router = useRouter();
  const businessId = useBusinessStore((state) => state.businessId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DebtFormData>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      name: "",
      description: "",
      total: 0,
      paid: 0
    }
  });

  const onSubmit = (data: DebtFormData) => {
    if (!businessId) {
      showNotification("No se ha seleccionado un negocio", "error");
      return;
    }

    const newDebt: DebtModel = {
      ...data,
      business: businessId,
      employee: employee as EmployeeModel
    };

    saveDebt(newDebt);
    reset();
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

      <View className="mb-4">
        <Text className="mb-1 font-medium" style={{ color: defaultColors.text }}>
          Total
        </Text>
        <Controller
          control={control}
          name="total"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border rounded-md p-2"
              style={{
                borderColor: defaultColors.primary,
                color: defaultColors.text,
                backgroundColor: defaultColors.background
              }}
              placeholder="Total de la deuda"
              placeholderTextColor={defaultColors.textSecondary}
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              keyboardType="numeric"
            />
          )}
        />
        {errors.total && (
          <Text className="text-sm mt-1" style={{ color: colors.error.dark }}>
            {errors.total.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="mb-1 font-medium" style={{ color: defaultColors.text }}>
          Pagado
        </Text>
        <Controller
          control={control}
          name="paid"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border rounded-md p-2"
              style={{
                borderColor: defaultColors.primary,
                color: defaultColors.text,
                backgroundColor: defaultColors.background
              }}
              placeholder="Monto pagado"
              placeholderTextColor={defaultColors.textSecondary}
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              keyboardType="numeric"
            />
          )}
        />
        {errors.paid && (
          <Text className="text-sm mt-1" style={{ color: colors.error.dark }}>
            {errors.paid.message}
          </Text>
        )}
      </View>

      <View className="flex-row justify-end mt-4">
        <TouchableOpacity
          className="px-4 py-2 rounded-md mr-2"
          style={{ backgroundColor: defaultColors.background }}
          onPress={() => router.back()}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: defaultColors.primary }}
          onPress={handleSubmit(onSubmit)}
          disabled={loadingSave}
        >
          {loadingSave ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ color: "#ffffff" }}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
