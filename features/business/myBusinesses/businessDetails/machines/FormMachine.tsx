import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { MachineModel } from "models/api/machine.model";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { machineService } from "services/machine.service";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly business: BusinessModel;
  readonly machine?: MachineModel;
  readonly isEditing: boolean;
}

// Definir el esquema de validación con Zod
const machineSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  active: z.boolean()
});

// Tipo inferido del esquema de Zod
type MachineFormData = z.infer<typeof machineSchema>;

export function FormMachine({ setModalVisible, business, machine, isEditing }: Props) {
  const defaultColors = useColors();
  const { updateBusiness } = useBusinessStore();
  const { showNotification } = useNotification();

  // Configurar React Hook Form con Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<MachineFormData>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      name: machine?.name ?? "",
      active: machine?.active ?? true
    }
  });

  const onSubmit = async (data: MachineFormData) => {
    // Crear un objeto de máquina con los datos del formulario
    const machineData: MachineModel = {
      ...data,
      business: business.id as number,
      ...(isEditing && machine?.id ? { id: machine.id } : {})
    };

    let response;
    if (isEditing && machine?.id) {
      response = await machineService.updateMachine(machineData);
    } else {
      response = await machineService.saveMachine(machineData);
    }

    if (response.status === 200) {
      // Actualizar el estado del negocio con la nueva máquina o la máquina actualizada
      if (isEditing && machine?.id) {
        // Si estamos editando, actualizamos la máquina existente
        const updatedMachines =
          business.machines?.map((m) => (m.id === machine.id ? { ...m, ...machineData } : m)) || [];

        updateBusiness(business.id as number, { machines: updatedMachines });
        showNotification("Máquina actualizada correctamente", "success");
      } else {
        // Si estamos añadiendo, agregamos la nueva máquina a la lista
        const newMachine = response.data as MachineModel;
        const updatedMachines = [...(business.machines || []), newMachine];

        updateBusiness(business.id as number, { machines: updatedMachines });
        showNotification("Máquina añadida correctamente", "success");
      }

      setModalVisible(false);
    } else {
      showNotification(`Error al ${isEditing ? "actualizar" : "añadir"} la máquina`, "error");
    }
  };

  return (
    <View>
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
              placeholder="Nombre de la máquina"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mb-2">{errors.name.message}</Text>}

        <View className="flex-row items-center justify-between mt-4">
          <Text style={{ color: defaultColors.text }} className="font-medium">
            Estado
          </Text>
          <Controller
            control={control}
            name="active"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: colors.error.light, true: colors.success.light }}
                thumbColor={value ? colors.success.light : colors.error.light}
              />
            )}
          />
        </View>
        <Text style={{ color: defaultColors.textSecondary }} className="text-xs mt-1">
          {control._formValues.active ? "Activa" : "Inactiva"}
        </Text>
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
          <Text className="text-white font-medium">{isEditing ? "Actualizar" : "Guardar"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
