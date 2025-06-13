import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
    <View className="mb-4">
      <Text style={{ color: defaultColors.text }} className="text-lg font-bold mb-1">
        {saleService.service.name}
      </Text>
      <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-4 ml-1">
        Precio: ${saleService.service.price.toFixed(2)}
      </Text>

      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Cantidad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            placeholder="Cantidad"
            error={errors.quantity?.message}
          />
        )}
      />

      <View className="flex-row justify-end gap-2 mt-4">
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
  );
}
