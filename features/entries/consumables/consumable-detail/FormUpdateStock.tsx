import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "components/ui/inputs/CustomInput";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { formatNumericInput } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly consumable: ConsumableModel;
}

const stockUpdateSchema = z.object({
  stock: z
    .string()
    .min(1, "El stock es obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El stock debe ser un número válido y no negativo"
    })
});

type StockUpdateFormData = z.infer<typeof stockUpdateSchema>;

export function FormUpdateStock({ setModalVisible, consumable }: Props) {
  const defaultColors = useColors();
  const { onUpdateConsumable, updatingConsumable } = useConsumables();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<StockUpdateFormData>({
    resolver: zodResolver(stockUpdateSchema),
    defaultValues: {
      stock: consumable.stock.toString()
    }
  });

  const onSubmit = async (data: StockUpdateFormData) => {
    const updatedConsumable: ConsumableModel = {
      ...consumable,
      stock: Number(data.stock)
    };

    onUpdateConsumable(updatedConsumable, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  if (updatingConsumable) {
    return <LoadingPage message="Actualizando stock..." />;
  }

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="stock"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Stock Disponible"
            value={value}
            onChangeText={(text) => onChange(formatNumericInput(text))}
            onBlur={onBlur}
            error={errors.stock?.message}
            placeholder="Cantidad en stock"
            placeholderTextColor={defaultColors.textSecondary}
            keyboardType="numeric"
            inputMode="numeric"
          />
        )}
      />

      <View className="flex-row justify-end gap-4 py-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <Pressable
          className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600"
          disabled={updatingConsumable}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: defaultColors.primary }}
          className="py-3 px-6 rounded-lg"
          disabled={updatingConsumable}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Actualizar Stock</Text>
        </Pressable>
      </View>
    </View>
  );
}
