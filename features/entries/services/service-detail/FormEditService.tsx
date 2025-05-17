import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { SelectModal } from "components/ui/modals/selectModal";
import { useConsumables } from "hooks/api/useConsumables";
import { useService } from "hooks/api/useServices";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { ServiceModel } from "models/api/service.model";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { adjustBrightness, formatNumericInput } from "utilities/helpers/globals.helpers";
import { z } from "zod";

//TODO: Textear este componente
interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly service: ServiceModel;
}

// Define validation schema with Zod
const serviceInfoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z
    .string()
    .min(1, "El precio es obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El precio debe ser un número válido y no negativo"
    }),
  description: z.string().optional(),
  costs: z
    .array(
      z.object({
        consumable: z.object({
          id: z.number(),
          name: z.string()
        }),
        quantity: z.string().min(1, "La cantidad es obligatoria")
      })
    )
    .optional()
});

// Type inferred from Zod schema
type ServiceInfoFormData = z.infer<typeof serviceInfoSchema>;

export function FormEditService({ setModalVisible, service }: Props) {
  const defaultColors = useColors();
  const { updateService, updatingService } = useService();
  const { consumables, loadingConsumables } = useConsumables();

  const [showConsumableModal, setShowConsumableModal] = useState(false);
  const [selectedConsumableIndex, setSelectedConsumableIndex] = useState<number | null>(null);

  // Configure React Hook Form with Zod
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ServiceInfoFormData>({
    resolver: zodResolver(serviceInfoSchema),
    defaultValues: {
      name: service.name,
      price: service.price.toString(),
      description: service.description ?? "",
      costs:
        service.costs?.map((cost) => ({
          consumable: cost.consumable,
          quantity: cost.quantity.toString()
        })) || []
    }
  });

  const costs = watch("costs") || [];

  const addCost = () => {
    setValue("costs", [...costs, { consumable: { id: 0, name: "" }, quantity: "" }], { shouldValidate: true });
  };

  const removeCost = (index: number) => {
    const newCosts = costs.filter((_, i) => i !== index);
    setValue("costs", newCosts, { shouldValidate: true });
  };

  const selectConsumable = (consumable: ConsumableModel) => {
    if (selectedConsumableIndex !== null) {
      const newCosts = [...costs];
      newCosts[selectedConsumableIndex] = {
        ...newCosts[selectedConsumableIndex],
        consumable: {
          id: consumable.id!,
          name: consumable.name
        }
      };
      setValue("costs", newCosts, { shouldValidate: true });
    }
    setShowConsumableModal(false);
  };

  const handleNumericInput = (text: string, index: number) => {
    const formattedValue = formatNumericInput(text);
    const newCosts = [...costs];
    newCosts[index] = {
      ...newCosts[index],
      quantity: formattedValue
    };
    setValue("costs", newCosts, { shouldValidate: true });
  };

  const onSubmit = async (data: ServiceInfoFormData) => {
    // Create updated service object
    const updatedService: ServiceModel = {
      ...service,
      name: data.name,
      price: Number(data.price),
      description: data.description ?? "",
      costs:
        data.costs?.map((cost) => ({
          consumable: consumables.find((c) => c.id === cost.consumable.id)!,
          quantity: parseFloat(cost.quantity)
        })) || []
    };

    // Update service
    updateService(updatedService, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  return (
    <View className="flex-1">
      {updatingService && <LoadingPage message="Actualizando..." absolute />}
      <ScrollView className="flex-1 p-4">
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
              placeholder="Nombre del servicio"
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
              placeholder="Descripción del servicio"
              placeholderTextColor={defaultColors.textSecondary}
              multiline
              numberOfLines={4}
            />
          )}
        />
        {errors.description && <Text className="text-red-500 text-xs mb-2">{errors.description.message}</Text>}

        {/* Consumibles Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text style={{ color: defaultColors.text }} className="text-lg font-medium">
              Insumos
            </Text>
            <TouchableOpacity
              onPress={addCost}
              className="p-2 rounded-lg"
              style={{ backgroundColor: defaultColors.primary }}
            >
              <MaterialIcons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {costs.map((cost, index) => (
            <View key={`cost-${cost.consumable?.id || "new"}-${index}`} className="flex-row items-center mb-3">
              <TouchableOpacity
                className="flex-1 p-3 rounded-lg mr-2"
                style={{ backgroundColor: adjustBrightness(defaultColors.background, 10) }}
                onPress={() => {
                  setSelectedConsumableIndex(index);
                  setShowConsumableModal(true);
                }}
              >
                <Text style={{ color: cost.consumable?.name ? defaultColors.text : defaultColors.textSecondary }}>
                  {cost.consumable?.name || "Seleccionar insumo"}
                </Text>
              </TouchableOpacity>

              <TextInput
                className="p-3 rounded-lg mr-2 w-20"
                style={{
                  backgroundColor: adjustBrightness(defaultColors.background, 10),
                  color: defaultColors.text
                }}
                value={cost.quantity}
                onChangeText={(text) => handleNumericInput(text, index)}
                placeholder="Cant."
                placeholderTextColor={defaultColors.textSecondary}
                keyboardType="numeric"
              />

              <TouchableOpacity
                onPress={() => removeCost(index)}
                className="p-3 rounded-lg"
                style={{ backgroundColor: defaultColors.secondary }}
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <Pressable
          className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600"
          disabled={updatingService}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: defaultColors.primary }}
          className="py-3 px-6 rounded-lg"
          disabled={updatingService}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar Cambios</Text>
        </Pressable>
      </View>

      {showConsumableModal && (
        <SelectModal<ConsumableModel>
          isVisible={showConsumableModal}
          title="Seleccionar Insumo"
          onClose={() => setShowConsumableModal(false)}
          data={consumables}
          renderItem={(item) => <Text style={{ color: defaultColors.text }}>{item.name}</Text>}
          onSelect={selectConsumable}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          isLoading={loadingConsumables}
        />
      )}
    </View>
  );
}
