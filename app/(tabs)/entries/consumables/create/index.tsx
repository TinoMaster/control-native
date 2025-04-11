import { zodResolver } from "@hookform/resolvers/zod";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { useRouter } from "expo-router";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { EUnit, TRANSLATE_UNIT } from "models/unit.model";
import { consumableDefaultValues, consumableSchema, ConsumableSchema } from "models/zod/consumableSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

export default function CreateConsumable() {
  const router = useRouter();
  const defaultColors = useColors();
  const { business } = useBusinessStore();
  const { onSaveConsumable } = useConsumables();
  const [loading, setLoading] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);

  // Función reutilizable para validar y formatear valores numéricos
  const handleNumericInput = (text: string, fieldName: "price" | "stock") => {
    // formatNumericInput es una función que valida y formatea los valores numéricos
    const formattedValue = formatNumericInput(text);
    setValue(fieldName, formattedValue, { shouldValidate: true });
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<ConsumableSchema>({
    resolver: zodResolver(consumableSchema),
    defaultValues: consumableDefaultValues,
    mode: "onChange"
  });

  const onSubmit = (data: ConsumableSchema) => {
    setLoading(true);
    // Asegurar que los valores son números válidos
    const priceValue = parseFloat(data.price) || 0;
    const stockValue = parseFloat(data.stock) || 0;

    const consumable: ConsumableModel = {
      name: data.name,
      description: data.description ?? "",
      price: parseFloat((priceValue / stockValue).toFixed(2)),
      unit: data.unit,
      stock: stockValue,
      business: business?.id!
    };

    onSaveConsumable(consumable, {
      onSuccess: () => {
        router.back();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: defaultColors.background
      }}
    >
      <BackButtonPlusTitle title="Crear Insumo" />

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
            Nombre del Insumo
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark
            }}
            placeholder="Ingrese el nombre del insumo"
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
              height: 100,
              textAlignVertical: "top"
            }}
            placeholder="Ingrese una descripción del insumo"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setValue("description", text, { shouldValidate: true })}
          />
          {errors.description && (
            <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.description.message}</Text>
          )}
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
            placeholder="Ingrese el precio del insumo"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            keyboardType="decimal-pad"
            value={watch("price")}
            onChangeText={(text) => handleNumericInput(text, "price")}
          />
          {errors.price && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.price.message}</Text>}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Unidad de Medida
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            onPress={() => setShowUnitModal(true)}
          >
            <Text
              style={{
                color: colors.lightMode.text.dark
              }}
            >
              {watch("unit") ? TRANSLATE_UNIT[watch("unit")] : "Seleccione una unidad"}
            </Text>
          </TouchableOpacity>
          {errors.unit && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.unit.message}</Text>}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Stock Disponible
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark
            }}
            placeholder="Ingrese la cantidad disponible"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            keyboardType="decimal-pad"
            value={watch("stock")}
            onChangeText={(text) => handleNumericInput(text, "stock")}
          />
          {errors.stock && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.stock.message}</Text>}
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
              Crear Insumo
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Unit Selection Modal */}
      <Modal visible={showUnitModal} transparent animationType="fade" onRequestClose={() => setShowUnitModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View
            style={{
              backgroundColor: colors.background.light.primary,
              borderRadius: 12,
              padding: 16,
              width: "80%"
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
                color: colors.lightMode.text.light
              }}
            >
              Seleccionar Unidad de Medida
            </Text>

            {Object.entries(TRANSLATE_UNIT).map(([unit, label]) => (
              <TouchableOpacity
                key={unit}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.background.light.secondary
                }}
                onPress={() => {
                  setValue("unit", unit as EUnit, { shouldValidate: true });
                  setShowUnitModal(false);
                }}
              >
                <Text
                  style={{
                    color: colors.lightMode.text.light,
                    fontSize: 16
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setShowUnitModal(false)}
              style={{
                backgroundColor: colors.secondary.light,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 16
              }}
            >
              <Text
                style={{
                  color: colors.background.light.primary,
                  fontWeight: "bold"
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
