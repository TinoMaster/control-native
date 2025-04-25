import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { SelectModal } from "components/ui/modals/selectModal";
import { useRouter } from "expo-router";
import { useConsumables } from "hooks/api/useConsumables";
import { useService } from "hooks/api/useServices";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api";
import { serviceDefaultValues, serviceSchema, ServiceSchema } from "models/zod/service.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

export default function CreateService() {
  const router = useRouter();

  const defaultColors = useColors();
  const { business } = useBusinessStore();
  const { consumables, loadingConsumables } = useConsumables();
  const { saveService } = useService();

  const [loading, setLoading] = useState(false);
  const [showConsumableModal, setShowConsumableModal] = useState(false);
  const [selectedConsumableIndex, setSelectedConsumableIndex] = useState<number | null>(null);

  // Función reutilizable para validar y formatear valores numéricos
  const handleNumericInput = (text: string, fieldName: "price") => {
    const formattedValue = formatNumericInput(text);
    setValue(fieldName, formattedValue, { shouldValidate: true });
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: serviceDefaultValues,
    mode: "onChange"
  });

  const costs = watch("costs") ?? [];

  const onSubmit = (data: ServiceSchema) => {
    setLoading(true);
    const service: ServiceModel = {
      name: data.name,
      description: data.description ?? "",
      price: parseFloat(data.price),
      business: business?.id!,
      costs:
        data.costs?.map((cost) => ({
          consumable: consumables.find((c) => c.id === cost.consumable?.id)!,
          quantity: parseFloat(cost.quantity ?? "0")
        })) ?? []
    };
    saveService(service, {
      onSuccess: () => {
        router.back();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  const addCost = () => {
    setValue("costs", [...costs, { consumable: { id: 0, name: "" }, quantity: "" }], { shouldValidate: true });
  };

  const removeCost = (index: number) => {
    const newCosts = costs.filter((_: unknown, i: number) => i !== index);
    setValue("costs", newCosts, { shouldValidate: true });
  };

  const selectConsumable = (consumable: { id: number; name: string }) => {
    if (selectedConsumableIndex !== null) {
      const newCosts = [...costs];
      newCosts[selectedConsumableIndex] = {
        ...newCosts[selectedConsumableIndex],
        consumable
      };
      setValue("costs", newCosts, { shouldValidate: true });
    }
    setShowConsumableModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: defaultColors.background
      }}
    >
      <BackButtonPlusTitle title="Crear Servicio" />

      <ScrollView
        style={{
          backgroundColor: defaultColors.background,
          padding: 16
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Nombre del Servicio
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark
            }}
            placeholder="Ingrese el nombre del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            onChangeText={(text) => setValue("name", text, { shouldValidate: true })}
          />
          {errors.name && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.name.message}</Text>}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Descripción
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark,
              minHeight: 100,
              textAlignVertical: "top"
            }}
            multiline
            placeholder="Ingrese la descripción del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            onChangeText={(text) => setValue("description", text)}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Precio
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark
            }}
            keyboardType="numeric"
            placeholder="Ingrese el precio del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            value={watch("price")}
            onChangeText={(text) => handleNumericInput(text, "price")}
          />
          {errors.price && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.price.message}</Text>}
        </View>

        <View style={{ marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16
            }}
          >
            <Text
              style={{
                color: defaultColors.text
              }}
            >
              Consumibles
            </Text>
            <TouchableOpacity
              onPress={addCost}
              style={{
                backgroundColor: defaultColors.primary,
                padding: 8,
                borderRadius: 8
              }}
            >
              <MaterialIcons name="add" size={20} color={colors.darkMode.text.light} />
            </TouchableOpacity>
          </View>

          {costs.map((cost, index) => (
            <View
              key={`cost-${cost.consumable?.id ?? "new"}-${index}`}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.background.light.primary,
                  padding: 12,
                  borderRadius: 8,
                  marginRight: 8
                }}
                onPress={() => {
                  setSelectedConsumableIndex(index);
                  setShowConsumableModal(true);
                }}
              >
                <Text
                  style={{
                    color: cost.consumable?.name ? colors.lightMode.text.light : colors.lightMode.textSecondary.light
                  }}
                >
                  {cost.consumable?.name !== "" ? cost.consumable?.name : "Seleccionar consumible"}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={{
                  backgroundColor: colors.background.light.primary,
                  padding: 12,
                  borderRadius: 8,
                  width: 80,
                  marginRight: 8,
                  color: colors.lightMode.text.dark
                }}
                keyboardType="numeric"
                placeholder="Cant."
                placeholderTextColor={colors.lightMode.textSecondary.light}
                onChangeText={(text) => {
                  const newCosts = [...costs];
                  newCosts[index] = {
                    ...newCosts[index],
                    quantity: text
                  };
                  setValue("costs", newCosts, { shouldValidate: true });
                }}
              />

              <TouchableOpacity
                onPress={() => removeCost(index)}
                style={{
                  backgroundColor: colors.secondary.light,
                  padding: 12,
                  borderRadius: 8
                }}
              >
                <MaterialIcons name="delete" size={20} color={colors.background.light.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: colors.primary.light,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 16,
            marginBottom: 30,
            opacity: loading || !isValid ? 0.5 : 1
          }}
          disabled={loading || !isValid}
        >
          {loading ? (
            <ActivityIndicator color={colors.background.light.primary} />
          ) : (
            <Text
              style={{
                color: colors.background.light.primary,
                fontWeight: "bold",
                fontSize: 16
              }}
            >
              Crear Servicio
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {showConsumableModal && (
        <SelectModal
          isVisible={showConsumableModal}
          title="Seleccionar Consumible"
          onClose={() => setShowConsumableModal(false)}
          data={consumables}
          renderItem={(item) => <Text>{item.name}</Text>}
          onSelect={selectConsumable}
          keyExtractor={(item) => item.id.toString()}
          isLoading={loadingConsumables}
        ></SelectModal>
      )}
    </View>
  );
}
