import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { EUnit, TRANSLATE_UNIT } from "models/api/unit.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly consumable: ConsumableModel;
}

const consumableInfoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z
    .string()
    .min(1, "El precio es obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El precio debe ser un número válido y no negativo"
    }),
  unit: z.nativeEnum(EUnit, {
    errorMap: () => ({ message: "Unidad no válida" })
  }),
  description: z.string().optional()
});

type ConsumableInfoFormData = z.infer<typeof consumableInfoSchema>;

export function FormEditConsumable({ setModalVisible, consumable }: Props) {
  const defaultColors = useColors();
  const { onUpdateConsumable, updatingConsumable } = useConsumables();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ConsumableInfoFormData>({
    resolver: zodResolver(consumableInfoSchema),
    defaultValues: {
      name: consumable.name,
      price: consumable.price.toString(),
      unit: consumable.unit,
      description: consumable.description ?? ""
    }
  });

  const onSubmit = async (data: ConsumableInfoFormData) => {
    const updatedConsumable: ConsumableModel = {
      ...consumable,
      name: data.name,
      price: Number(data.price),
      unit: data.unit,
      description: data.description ?? ""
    };

    onUpdateConsumable(updatedConsumable, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  const units = Object.values(EUnit);

  return (
    <View>
      {updatingConsumable && <LoadingPage message="Actualizando..." absolute />}
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Nombre
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nombre del insumo"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mb-2">{errors.name.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium mt-4">
          Precio
        </Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.price ? "border-red-500" : "border-gray-300 dark:border-gray-600"
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
        {errors.price && <Text className="text-red-500 text-xs mb-2">{errors.price.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium mt-4">
          Unidad
        </Text>
        <Controller
          control={control}
          name="unit"
          render={({ field: { onChange, value } }) => (
            <View className="mb-2">
              {units.map((unit) => (
                <Pressable
                  key={unit}
                  className={`p-2 mb-1 rounded-lg flex-row items-center ${
                    value === unit ? "bg-primary-dark dark:bg-primary-dark" : ""
                  }`}
                  onPress={() => onChange(unit)}
                >
                  <View
                    className={`h-5 w-5 rounded-full border mr-2 items-center justify-center ${
                      value === unit ? "border-primary-dark bg-primary-light" : "border-gray-400 dark:border-gray-500"
                    }`}
                  >
                    {value === unit && <View className="h-2 w-2 rounded-full bg-white" />}
                  </View>
                  <Text style={{ color: value === unit ? "white" : defaultColors.text }}>{TRANSLATE_UNIT[unit]}</Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {errors.unit && <Text className="text-red-500 text-xs mb-2">{errors.unit.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium mt-4">
          Descripción (Opcional)
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 h-20 text-justify ${
                errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{
                color: defaultColors.text,
                backgroundColor: adjustBrightness(defaultColors.background, 10),
                textAlignVertical: "top"
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Descripción del insumo"
              placeholderTextColor={defaultColors.textSecondary}
              multiline
              numberOfLines={4}
            />
          )}
        />
        {errors.description && <Text className="text-red-500 text-xs mb-2">{errors.description.message}</Text>}
      </View>

      <View className="flex-row justify-end gap-2 mt-4">
        <Pressable
          className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600"
          disabled={updatingConsumable}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: defaultColors.primary }}
          className="py-2 px-4 rounded-lg "
          disabled={updatingConsumable}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
