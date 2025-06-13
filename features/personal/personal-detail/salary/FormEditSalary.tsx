import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly employee: EmployeeModel;
}

const salarySchema = z.object({
  fixedSalary: z
    .string()
    .min(1, "El salario fijo es obligatorio")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "El salario debe ser un número positivo"
    }),
  percentSalary: z
    .string()
    .min(1, "La comisión es obligatoria")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 100, {
      message: "La comisión debe ser un número entre 0 y 100"
    })
});

interface SalaryFormData {
  fixedSalary: string;
  percentSalary: string;
}

export function FormEditSalary({ setModalVisible, employee }: Props) {
  const defaultColors = useColors();
  const { updateEmployee, loadingUpdate } = useEmployees();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SalaryFormData>({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      fixedSalary: employee.fixedSalary.toString(),
      percentSalary: (employee.percentSalary * 100).toFixed(0)
    }
  });

  const onSubmit = async (data: SalaryFormData) => {
    const updatedEmployee: EmployeeModel = {
      ...employee,
      fixedSalary: parseFloat(data.fixedSalary),
      percentSalary: parseFloat(data.percentSalary) / 100
    };

    updateEmployee(updatedEmployee, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  return (
    <View>
      {loadingUpdate && <LoadingPage message="Actualizando..." absolute />}
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Salario Fijo ($)
        </Text>
        <Controller
          control={control}
          name="fixedSalary"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.fixedSalary ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="0.00"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="numeric"
            />
          )}
        />
        {errors.fixedSalary && <Text className="text-red-500 text-xs mb-2">{errors.fixedSalary.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Comisión (%)
        </Text>
        <Controller
          control={control}
          name="percentSalary"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.percentSalary ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="0"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="numeric"
            />
          )}
        />
        {errors.percentSalary && <Text className="text-red-500 text-xs mb-2">{errors.percentSalary.message}</Text>}
      </View>

      <View className="flex-row justify-end gap-2">
        <Pressable
          style={{ backgroundColor: colors.error.light }}
          disabled={loadingUpdate}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: colors.primary.light }}
          disabled={loadingUpdate}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
