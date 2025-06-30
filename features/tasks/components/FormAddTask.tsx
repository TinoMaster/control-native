import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { format } from "date-fns";
import { useEmployees } from "hooks/api/useEmployees";
import { useTasks } from "hooks/api/useTasks";
import useColors from "hooks/useColors";
import { ERole, ETaskStatus, TaskModel } from "models/api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { z } from "zod";

// Define the schema for task validation
const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  dateLimit: z.date(),
  assignedTo: z.number().optional()
});

type TaskFormData = z.infer<typeof taskSchema>;

interface FormAddTaskProps {
  readonly onClose: () => void;
}

export function FormAddTask({ onClose }: FormAddTaskProps) {
  const employee = useAuthStore((state) => state.employee);
  const role = useAuthStore((state) => state.role);
  const { employees } = useEmployees();
  const defaultColors = useColors();
  const businessId = useBusinessStore((state) => state.businessId);
  const { saveTask, loadingSaveTask } = useTasks({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Verificar si el usuario puede editar la asignación de tareas
  const canEditAssignment = role === ERole.ADMIN || role === ERole.OWNER;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dateLimit: new Date(),
      assignedTo: employee?.id ? Number(employee.id) : undefined
    }
  });

  const dateLimit = watch("dateLimit");

  const onSubmit = (data: TaskFormData) => {
    if (!businessId) return;

    const newTask: Partial<TaskModel> = {
      title: data.title,
      description: data.description,
      status: ETaskStatus.PENDING,
      businessId: businessId,
      dateLimit: data.dateLimit,
      assignedToId: data.assignedTo ?? Number(employee?.id)
    };

    saveTask(newTask as TaskModel);
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue("dateLimit", selectedDate);
    }
  };

  return (
    <View className=" gap-4">
      {/* Title Input */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            value={value}
            label="Título"
            placeholder="Título de la tarea"
            placeholderTextColor={defaultColors.textSecondary}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.title?.message}
          />
        )}
      />

      {/* Description Input */}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            value={value}
            label="Descripción"
            multiline
            numberOfLines={4}
            placeholder="Descripción de la tarea"
            placeholderTextColor={defaultColors.textSecondary}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.description?.message}
          />
        )}
      />

      {/* Date Limit Input */}
      <View className="space-y-1">
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium mb-1 ml-1">
          Fecha límite
        </Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="border border-gray-400 border-opacity-30 rounded-lg p-3 bg-transparent"
        >
          <Text style={{ color: defaultColors.text }}>{format(dateLimit, "dd/MM/yyyy")}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateLimit}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Assigned Employee Input */}
      <View className="space-y-1">
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium mb-1 ml-1">
          Asignado a
        </Text>
        <View className="border border-gray-400 border-opacity-30 rounded-lg overflow-hidden">
          <Controller
            control={control}
            name="assignedTo"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                enabled={canEditAssignment}
                dropdownIconColor={defaultColors.text}
                itemStyle={{ height: 120, backgroundColor: defaultColors.background }}
                style={{
                  color: defaultColors.text,
                  backgroundColor: canEditAssignment ? "transparent" : "rgba(0,0,0,0.05)"
                }}
              >
                {employees?.map((emp) => (
                  <Picker.Item
                    key={emp.id}
                    label={`${emp.user?.name ?? "Sin nombre"}`}
                    value={Number(emp.id)}
                  />
                ))}
              </Picker>
            )}
          />
        </View>
        {!canEditAssignment && (
          <Text style={{ color: defaultColors.textSecondary }} className="text-xs italic mt-1">
            Solo administradores pueden cambiar la asignación
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <View className="flex-row justify-end mt-4">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loadingSaveTask}
          style={{ backgroundColor: defaultColors.primary }}
          className="px-4 py-2 rounded-md"
        >
          {loadingSaveTask ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white font-medium">Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
