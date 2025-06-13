import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { ERole } from "models/api/roles.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly employee: EmployeeModel;
}

const principalInfoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  dni: z.string().min(1, "El DNI es obligatorio"),
  role: z.nativeEnum(ERole, {
    errorMap: () => ({ message: "Rol no válido" })
  }),
  active: z.boolean()
});

type PrincipalInfoFormData = z.infer<typeof principalInfoSchema>;

export function FormEditPrincipalInfo({ setModalVisible, employee }: Props) {
  const defaultColors = useColors();
  const { updateEmployee, loadingUpdate } = useEmployees();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PrincipalInfoFormData>({
    resolver: zodResolver(principalInfoSchema),
    defaultValues: {
      name: employee.user.name,
      dni: employee.dni,
      role: employee.user.role,
      active: employee.user.active
    }
  });

  const onSubmit = async (data: PrincipalInfoFormData) => {
    const updatedEmployee: EmployeeModel = {
      ...employee,
      dni: data.dni,
      user: {
        ...employee.user,
        name: data.name,
        role: data.role,
        active: data.active
      }
    };

    updateEmployee(updatedEmployee, {
      onSuccess: () => {
        setModalVisible(false);
      }
    });
  };

  const roles = Object.values(ERole).filter((role) => role !== ERole.OWNER && role !== ERole.SUPERADMIN);

  return (
    <View>
      {loadingUpdate && <LoadingPage message="Actualizando..." absolute />}
      <View className="mb-4">
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
              placeholder="Nombre"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mb-2">{errors.name.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          DNI
        </Text>
        <Controller
          control={control}
          name="dni"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.dni ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="DNI"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.dni && <Text className="text-red-500 text-xs mb-2">{errors.dni.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Rol
        </Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View className="mb-2">
              {roles.map((role) => (
                <Pressable
                  key={role}
                  className={`p-2 mb-1 rounded-lg flex-row items-center ${
                    value === role ? "bg-blue-100 dark:bg-blue-900" : ""
                  }`}
                  onPress={() => onChange(role)}
                >
                  <View
                    className={`h-5 w-5 rounded-full border mr-2 items-center justify-center ${
                      value === role ? "border-blue-500 bg-blue-500" : "border-gray-400 dark:border-gray-500"
                    }`}
                  >
                    {value === role && <View className="h-2 w-2 rounded-full bg-white" />}
                  </View>
                  <Text style={{ color: defaultColors.text }}>{role}</Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {errors.role && <Text className="text-red-500 text-xs mb-2">{errors.role.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Estado
        </Text>
        <Controller
          control={control}
          name="active"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center">
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: "#767577", true: colors.primary.light }}
                thumbColor={value ? colors.primary.light : "#f4f3f4"}
              />
              <Text style={{ color: defaultColors.text }} className="ml-2">
                {value ? "Activo" : "Inactivo"}
              </Text>
            </View>
          )}
        />
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
