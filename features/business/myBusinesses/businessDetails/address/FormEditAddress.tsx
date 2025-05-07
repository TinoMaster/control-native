import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { AddressModel } from "models/api/address.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { addressService } from "services/address.service";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly business: BusinessModel;
}

// Definir el esquema de validación con Zod
const addressSchema = z.object({
  street: z.string().min(1, "La calle es obligatoria"),
  number: z.string().min(1, "El número es obligatorio"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  municipality: z.string().min(1, "El municipio es obligatorio"),
  zip: z.string().min(5, "El código postal debe tener al menos 5 caracteres")
});

// Tipo inferido del esquema de Zod
type AddressFormData = z.infer<typeof addressSchema>;

export function FormEditAddress({ setModalVisible, business }: Props) {
  const defaultColors = useColors();
  const { updateBusiness } = useBusinessStore();
  const { showNotification } = useNotification();

  // Configurar React Hook Form con Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: business.address.street,
      number: business.address.number,
      city: business.address.city,
      municipality: business.address.municipality,
      zip: business.address.zip
    }
  });

  const onSubmit = async (data: AddressFormData) => {
    // Crear un nuevo objeto de dirección
    const updatedAddress: AddressModel = {
      ...business.address,
      ...data
    };

    // Actualizar el negocio con la nueva dirección
    const response = await addressService.saveAddress(updatedAddress);
    console.log(response);

    if (response.status === 200) {
      updateBusiness(business.id as number, { address: updatedAddress });
      showNotification("Dirección actualizada correctamente", "success");
      setModalVisible(false);
    } else {
      showNotification("Error al actualizar la dirección", "error");
    }
  };
  return (
    <View>
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Calle
        </Text>
        <Controller
          control={control}
          name="street"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.street ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Calle"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.street && <Text className="text-red-500 text-xs mb-2">{errors.street.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Número
        </Text>
        <Controller
          control={control}
          name="number"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.number ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Número"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.number && <Text className="text-red-500 text-xs mb-2">{errors.number.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Ciudad
        </Text>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Ciudad"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.city && <Text className="text-red-500 text-xs mb-2">{errors.city.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Municipio
        </Text>
        <Controller
          control={control}
          name="municipality"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.municipality ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Municipio"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.municipality && <Text className="text-red-500 text-xs mb-2">{errors.municipality.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Código Postal
        </Text>
        <Controller
          control={control}
          name="zip"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.zip ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Código Postal"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="number-pad"
            />
          )}
        />
        {errors.zip && <Text className="text-red-500 text-xs mb-2">{errors.zip.message}</Text>}
      </View>

      <View className="flex-row justify-end gap-2">
        <Pressable
          style={{ backgroundColor: colors.error.light }}
          className="py-2 px-4 rounded-lg"
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: colors.primary.light }}
          className="py-2 px-4 rounded-lg"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
