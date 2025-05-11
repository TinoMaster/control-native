import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
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
const contactSchema = z.object({
  email: z.string().email("Email no válido").min(1, "El email es obligatorio"),
  phone: z.string().min(1, "El teléfono es obligatorio")
});

// Type inferred from Zod schema
type ContactFormData = z.infer<typeof contactSchema>;

export function FormEditContact({ setModalVisible, employee }: Props) {
  const defaultColors = useColors();
  const { updateEmployee, loadingUpdate } = useEmployees();

  // Configure React Hook Form with Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: employee.user.email,
      phone: employee.phone || ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Create updated employee object
    const updatedEmployee: EmployeeModel = {
      ...employee,
      phone: data.phone,
      user: {
        ...employee.user,
        email: data.email
      }
    };

    // Update employee
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
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Teléfono
        </Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Teléfono"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && <Text className="text-red-500 text-xs mb-2">{errors.phone.message}</Text>}
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
