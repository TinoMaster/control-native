import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { SelectModal } from "components/ui/modals/selectModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { useConsumables } from "hooks/api/useConsumables";
import useColors from "hooks/useColors";
import { ConsumableModel } from "models/api/consumables.model";
import { EUnit, TRANSLATE_UNIT } from "models/api/unit.model";
import { consumableDefaultValues, consumableSchema, ConsumableSchema } from "models/zod/consumable.schema";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
    control,
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
    <GradientBackground>
      <CustomHeader title="Crear Insumo" showBackButton />

      <MyScrollView>
        <ContentWrapper>
          <View>
            {/* Consumable Name */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Nombre del Insumo"
                  placeholder="Ingrese el nombre del insumo"
                  keyboardType="default"
                  whiteBackground
                  value={value}
                  error={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />
            {/* Consumable Description */}
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Descripción"
                  placeholder="Ingrese una descripción del insumo"
                  keyboardType="default"
                  whiteBackground
                  value={value}
                  error={errors.description?.message}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                />
              )}
            />
            {/* Consumable Price */}
            <Controller
              control={control}
              name="price"
              render={({ field: { value } }) => (
                <CustomInput
                  label="Precio del Stock"
                  placeholder="Ingrese el precio de todo el stock de entrada"
                  keyboardType="decimal-pad"
                  whiteBackground
                  value={value}
                  error={errors.price?.message}
                  onChangeText={(text) => handleNumericInput(text, "price")}
                />
              )}
            />
            {/* Consumable Unit */}
            <View className="mb-4">
              <Text
                style={{
                  color: defaultColors.text,
                  marginBottom: 2
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
              {errors.unit && (
                <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.unit.message}</Text>
              )}
            </View>
            {/* Consumable Stock */}
            <Controller
              control={control}
              name="stock"
              render={({ field: { value } }) => (
                <CustomInput
                  label="Stock Disponible"
                  icon={watch("unit") === EUnit.PERCENT ? "porcentaje" : "unidad"}
                  placeholder="Ingrese la cantidad disponible"
                  keyboardType="decimal-pad"
                  maxLength={watch("unit") === EUnit.PERCENT ? 3 : 10}
                  value={value}
                  error={errors.stock?.message}
                  onChangeText={(text) => handleNumericInput(text, "stock")}
                  whiteBackground
                />
              )}
            />
            {/* Consumable Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: colors.primary.light,
                padding: 16,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 20,
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
          </View>
        </ContentWrapper>
      </MyScrollView>

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
    </GradientBackground>
  );
}
