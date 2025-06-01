import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

interface FormEditServiceSaleProps {
  readonly saleService: ServiceSaleModel;
  readonly setModalVisible: (visible: boolean) => void;
}

// Schema for form validation using Zod
const editServiceSaleSchema = z.object({
  quantity: z
    .string()
    .min(1, "La cantidad es requerida")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "La cantidad debe ser un número mayor a 0"
    })
});

type FormValues = z.infer<typeof editServiceSaleSchema>;

export function FormEditServiceSale({ saleService, setModalVisible }: FormEditServiceSaleProps) {
  const defaultColors = useColors();
  const { editServiceSale, isLoadingEditServiceSale } = useServiceSale();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(editServiceSaleSchema),
    defaultValues: {
      quantity: saleService.quantity.toString()
    }
  });

  useEffect(() => {
    // Set initial values when the component mounts
    setValue("quantity", saleService.quantity.toString());
  }, [saleService, setValue]);

  const onSubmit = (data: FormValues) => {
    const updatedServiceSale: ServiceSaleModel = {
      ...saleService,
      quantity: Number(data.quantity)
    };

    editServiceSale(updatedServiceSale, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  return (
    <View className="p-2">
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="text-lg font-bold mb-1">
          {saleService.service.name}
        </Text>
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-4">
          Precio: ${saleService.service.price.toFixed(2)}
        </Text>

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Cantidad
        </Text>
        <Controller
          control={control}
          name="quantity"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${errors.quantity ? "border-red-500" : "border-gray-300"}`}
              style={{ color: defaultColors.text, backgroundColor: defaultColors.background }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              placeholder="Cantidad"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.quantity && <Text className="text-red-500 text-xs mb-2">{errors.quantity.message}</Text>}

        <View style={{ marginTop: 20 }} className="flex-row justify-end space-x-2">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 flex-row items-center"
            disabled={isLoadingEditServiceSale}
          >
            <Ionicons name="close-outline" size={20} color={defaultColors.textSecondary} />
            <Text style={{ color: defaultColors.textSecondary }} className="ml-1">
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="px-4 py-2 rounded-lg flex-row items-center"
            style={{ backgroundColor: defaultColors.primary }}
            disabled={isLoadingEditServiceSale}
          >
            {isLoadingEditServiceSale ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <Ionicons name="save-outline" size={20} color="#ffffff" />
                <Text style={{ color: "#ffffff" }} className="ml-1">
                  Guardar
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
