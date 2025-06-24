import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { SelectModal } from "components/ui/modals/selectModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { TaskModel } from "models/api/task.model";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly task: TaskModel;
  readonly onTaskUpdate: (updatedTask: Partial<TaskModel>) => void;
}

// Define validation schema with Zod
const taskEditSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  dateLimit: z.date().optional(),
  assignedToId: z.number().nullable().optional()
});

type TaskEditFormData = z.infer<typeof taskEditSchema>;

export function FormEditTask({ setModalVisible, task, onTaskUpdate }: Props) {
  const defaultColors = useColors();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const { employees, loadingEmployees } = useEmployees();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TaskEditFormData>({
    resolver: zodResolver(taskEditSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      dateLimit: task.dateLimit ? new Date(task.dateLimit) : undefined,
      assignedToId: task.assignedToId ? Number(task.assignedToId) : undefined
    }
  });

  const dateLimit = watch("dateLimit");
  const assignedToId = watch("assignedToId");

  const selectedEmployee =
    assignedToId !== undefined
      ? employees.find((emp) => emp.id === assignedToId?.toString())
      : undefined;

  const onSubmit = (data: TaskEditFormData) => {
    const updatedTask: Partial<TaskModel> = {
      title: data.title,
      description: data.description,
      dateLimit: data.dateLimit ? data.dateLimit : undefined,
      assignedToId: data.assignedToId ? Number(data.assignedToId) : undefined
    };

    onTaskUpdate(updatedTask);

    setModalVisible(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue("dateLimit", selectedDate, { shouldValidate: true });
    }
  };

  const clearDate = () => {
    setValue("dateLimit", undefined, { shouldValidate: true });
  };

  const handleEmployeeSelect = (employee: EmployeeModel) => {
    setValue("assignedToId", employee.id ? Number(employee.id) : undefined, {
      shouldValidate: true
    });
  };

  const clearAssignedEmployee = () => {
    setValue("assignedToId", undefined, { shouldValidate: true });
  };

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Título"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.title?.message}
            placeholder="Título de la tarea"
            placeholderTextColor={defaultColors.textSecondary}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Descripción"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
            placeholder="Descripción de la tarea"
            placeholderTextColor={defaultColors.textSecondary}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-2 font-medium">
          Fecha límite
        </Text>
        <View className="flex-row items-center">
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="flex-1 p-3 rounded-lg mr-2 flex-row items-center"
            style={{ backgroundColor: `${defaultColors.background}20` }}
          >
            <MaterialCommunityIcons name="calendar" size={20} color={defaultColors.primary} />
            <Text style={{ color: defaultColors.text }} className="ml-2">
              {dateLimit && dateLimit instanceof Date
                ? format(dateLimit, "d 'de' MMMM, yyyy", { locale: es })
                : "Seleccionar fecha límite"}
            </Text>
          </Pressable>

          {dateLimit && (
            <Pressable
              onPress={clearDate}
              className="p-3 rounded-lg"
              style={{ backgroundColor: defaultColors.secondary }}
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Selector de empleado asignado */}
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-2 font-medium">
          Asignado a
        </Text>
        <View className="flex-row items-center">
          <Pressable
            onPress={() => setShowEmployeeModal(true)}
            className="flex-1 p-3 rounded-lg mr-2 flex-row items-center"
            style={{ backgroundColor: `${defaultColors.background}20` }}
          >
            <MaterialCommunityIcons name="account" size={20} color={defaultColors.primary} />
            <Text style={{ color: defaultColors.text }} className="ml-2">
              {selectedEmployee ? selectedEmployee.user.name : "Seleccionar empleado"}
            </Text>
          </Pressable>

          {assignedToId && (
            <Pressable
              onPress={clearAssignedEmployee}
              className="p-3 rounded-lg"
              style={{ backgroundColor: defaultColors.secondary }}
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
            </Pressable>
          )}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dateLimit || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Modal de selección de empleado */}
      {showEmployeeModal && (
        <SelectModal
          isVisible={showEmployeeModal}
          title="Seleccionar Empleado"
          onClose={() => setShowEmployeeModal(false)}
          data={employees}
          renderItem={(item) => <Text style={{ color: defaultColors.text }}>{item.user.name}</Text>}
          onSelect={handleEmployeeSelect}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          isLoading={loadingEmployees}
        />
      )}

      <View className="flex-row justify-end gap-4 py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
        <Pressable
          className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600"
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: defaultColors.primary }}
          className="py-3 px-6 rounded-lg"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
