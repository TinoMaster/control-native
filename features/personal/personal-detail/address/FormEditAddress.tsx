import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { AddressModel } from "models/api/address.model";
import { EmployeeModel } from "models/api/employee.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly employee: EmployeeModel;
}

// Define validation schema with Zod
const addressSchema = z.object({
  street: z.string().min(1, "La calle es obligatoria"),
  number: z.string().min(1, "El número es obligatorio"),
  municipality: z.string().min(1, "El municipio es obligatorio"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  zip: z.string().min(1, "El código postal es obligatorio")
});

type AddressFormData = z.infer<typeof addressSchema>;

export function FormEditAddress({ setModalVisible, employee }: Props) {
  const defaultColors = useColors();
  const { updateEmployee, loadingUpdate } = useEmployees();

  const currentAddress = employee.address || {
    street: "",
    number: "",
    municipality: "",
    city: "",
    zip: ""
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: currentAddress.street,
      number: currentAddress.number,
      municipality: currentAddress.municipality,
      city: currentAddress.city,
      zip: currentAddress.zip
    }
  });

  const onSubmit = async (data: AddressFormData) => {
    const updatedAddress: AddressModel = {
      street: data.street,
      number: data.number,
      municipality: data.municipality,
      city: data.city,
      zip: data.zip
    };

    const updatedEmployee: EmployeeModel = {
      ...employee,
      address: updatedAddress
    };

    updateEmployee(updatedEmployee, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  return (
    <View>
      {loadingUpdate && <LoadingPage message="Actualizando..." absolute />}
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
              keyboardType="numeric"
            />
          )}
        />
        {errors.zip && <Text className="text-red-500 text-xs mb-2">{errors.zip.message}</Text>}
      </View>

      <View className="flex-row justify-end gap-2">
        <Pressable
          style={{ backgroundColor: colors.error.light }}
          disabled={loadingUpdate}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: colors.primary.light }}
          disabled={loadingUpdate}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
