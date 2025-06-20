import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useTasks } from "hooks/api/useTasks";
import useColors from "hooks/useColors";
import { ETaskStatus, TaskModel } from "models/api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import { z } from "zod";

// Define the schema for task validation
const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  dateLimit: z.date()
});

type TaskFormData = z.infer<typeof taskSchema>;

interface FormAddTaskProps {
  onClose: () => void;
}

export function FormAddTask({ onClose }: FormAddTaskProps) {
  const employee = useAuthStore((state) => state.employee);
  const defaultColors = useColors();
  const businessId = useBusinessStore((state) => state.businessId);
  const { saveTask, loadingSaveTask } = useTasks();
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      dateLimit: new Date()
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
      assignedTo: Number(employee?.id)
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
      <View className="space-y-1">
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium">
          Título
        </Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                color: defaultColors.text,
                borderColor: errors.title ? "red" : defaultColors.primary
              }}
              className="border rounded-md p-2 bg-transparent"
              placeholder="Título de la tarea"
              placeholderTextColor={defaultColors.textSecondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text className="text-red-500 text-xs">{errors.title.message}</Text>}
      </View>

      {/* Description Input */}
      <View className="space-y-1">
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium">
          Descripción
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                color: defaultColors.text,
                borderColor: errors.description ? "red" : defaultColors.primary,
                height: 100,
                textAlignVertical: "top"
              }}
              className="border rounded-md p-2 bg-transparent"
              placeholder="Descripción de la tarea"
              placeholderTextColor={defaultColors.textSecondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
            />
          )}
        />
        {errors.description && (
          <Text className="text-red-500 text-xs">{errors.description.message}</Text>
        )}
      </View>

      {/* Date Limit Input */}
      <View className="space-y-1">
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium">
          Fecha límite
        </Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{ borderColor: defaultColors.primary }}
          className="border rounded-md p-3 bg-transparent"
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
