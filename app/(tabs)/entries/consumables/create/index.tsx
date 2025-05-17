import { zodResolver } from "@hookform/resolvers/zod";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import GenericInput from "components/forms/generic-input";
import { SelectModal } from "components/ui/modals/selectModal";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { EUnit, TRANSLATE_UNIT } from "models/api/unit.model";
import { consumableDefaultValues, consumableSchema, ConsumableSchema } from "models/zod/consumable.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

export default function CreateConsumable() {
  const defaultColors = useColors();
  const { business } = useBusinessStore();
  const { onSaveConsumable, loadingSave } = useConsumables();
  const [showUnitModal, setShowUnitModal] = useState(false);

  const units: EUnit[] = Object.values(EUnit);

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

  const selectUnit = (unit: EUnit) => {
    setValue("unit", unit, { shouldValidate: true });
    setShowUnitModal(false);
  };

  const onSubmit = (data: ConsumableSchema) => {
    // Asegurar que los valores son números válidos
    const priceValue = parseFloat(data.price) ?? 0;
    const stockValue = parseFloat(data.stock) ?? 0;

    const consumable: ConsumableModel = {
      name: data.name,
      description: data.description ?? "",
      price: parseFloat((priceValue / stockValue).toFixed(2)),
      unit: data.unit,
      stock: stockValue,
      business: business?.id!
    };

    onSaveConsumable(consumable);
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
        {/* Consumable Name */}
        <View style={{ marginBottom: 16 }}>
          <GenericInput
            label="Nombre del Insumo"
            placeholder="Ingrese el nombre del insumo"
            keyboardType="default"
            watch={watch("name")}
            error={errors.name}
            onChangeText={(text) => setValue("name", text, { shouldValidate: true })}
          />
        </View>
        {/* Consumable Description */}
        <View style={{ marginBottom: 16 }}>
          <GenericInput
            label="Descripción"
            placeholder="Ingrese una descripción del insumo"
            keyboardType="default"
            watch={watch("description")}
            error={errors.description}
            onChangeText={(text) => setValue("description", text, { shouldValidate: true })}
            multiline
            numberOfLines={3}
          />
        </View>
        {/* Consumable Price */}
        <View style={{ marginBottom: 16 }}>
          <GenericInput
            label="Precio del Stock"
            placeholder="Ingrese el precio de todo el stock de entrada"
            keyboardType="decimal-pad"
            watch={watch("price")}
            error={errors.price}
            onChangeText={(text) => handleNumericInput(text, "price")}
          />
        </View>
        {/* Consumable Unit */}
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
        {/* Consumable Stock */}
        <View style={{ marginBottom: 16 }}>
          <GenericInput
            label="Stock Disponible"
            placeholder="Ingrese la cantidad disponible"
            keyboardType="decimal-pad"
            watch={watch("stock")}
            error={errors.stock}
            onChangeText={(text) => handleNumericInput(text, "stock")}
          />
        </View>
        {/* Consumable Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: colors.primary.light,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 16,
            marginBottom: 30,
            opacity: loadingSave || !isValid ? 0.5 : 1
          }}
          disabled={loadingSave || !isValid}
        >
          {loadingSave ? (
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
      {showUnitModal && (
        <SelectModal
          isVisible={showUnitModal}
          title="Seleccionar Unidad de Medida"
          subtitle="Esto definirá como se descuenta luego según las ventas del servicio que lo use. Ej.(hojas blancas - por unidad, tinta negra - por porcentaje)"
          onClose={() => setShowUnitModal(false)}
          data={units}
          renderItem={(item) => <Text>{TRANSLATE_UNIT[item]}</Text>}
          onSelect={selectUnit}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
}
