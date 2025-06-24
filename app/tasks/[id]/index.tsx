import { useLocalSearchParams, useRouter } from "expo-router";
import { useTaskDetail } from "hooks/api/useTaskDetail";
import useColors from "hooks/useColors";
import { ERole, ETaskStatus, TaskModel } from "models/api";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { MyModal } from "components/ui/modals/myModal";
import { FormEditTask } from "features/tasks/components/FormEditTask";
import { useEmployees } from "hooks/api/useEmployees";
import { useAuthStore } from "store/auth.store";

const statusConfig = {
  [ETaskStatus.PENDING]: {
    label: "Pendiente",
    color: "#FFA500",
    icon: "clock-outline"
  },
  [ETaskStatus.IN_PROGRESS]: {
    label: "En Progreso",
    color: "#3498DB",
    icon: "progress-clock"
  },
  [ETaskStatus.COMPLETED]: {
    label: "Completada",
    color: "#2ECC71",
    icon: "check-circle-outline"
  },
  [ETaskStatus.CANCELLED]: {
    label: "Cancelada",
    color: "#E74C3C",
    icon: "close-circle-outline"
  }
};

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = useColors();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { getEmployeeById } = useEmployees();
  const role = useAuthStore((state) => state.role);

  const { task, loadingTask, updateTaskStatus, updateTask, loadingUpdateTask } = useTaskDetail(
    id as string
  );

  const getAssignedName = () => {
    if (task?.assignedToId) {
      const employee = getEmployeeById(task.assignedToId);
      return `${employee?.user.name}`;
    }
    return "General";
  };

  if (loadingTask) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text }} className="mt-4">
          Cargando detalles de la tarea...
        </Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.error} />
        <Text style={{ color: colors.text }} className="text-lg font-medium mt-2">
          No se pudo cargar la tarea
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-center mt-2">
          La tarea solicitada no existe o ha sido eliminada.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 py-2 px-4 rounded-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-medium">Volver</Text>
        </Pressable>
      </View>
    );
  }

  const currentStatus = statusConfig[task.status];

  const handleStatusChange = (newStatus: ETaskStatus) => {
    if (newStatus !== task.status && !loadingUpdateTask) {
      updateTaskStatus(newStatus);
    }
  };

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Encabezado */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text style={{ color: colors.text }} className="text-2xl font-bold" numberOfLines={2}>
            {task.title}
          </Text>
          {role === ERole.ADMIN ||
            (role === ERole.OWNER && (
              <Pressable
                onPress={() => setEditModalVisible(true)}
                className="p-2 rounded-full"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Feather name="edit-2" size={18} color={colors.primary} />
              </Pressable>
            ))}
        </View>
        <View className="flex-row items-center">
          <View
            className="py-1 px-3 rounded-full flex-row items-center"
            style={{ backgroundColor: `${currentStatus.color}20` }}
          >
            <MaterialCommunityIcons
              name={currentStatus.icon as any}
              size={16}
              color={currentStatus.color}
            />
            <Text style={{ color: currentStatus.color }} className="ml-1 font-medium">
              {currentStatus.label}
            </Text>
          </View>
          <Text style={{ color: colors.textSecondary }} className="ml-2">
            Creada el {format(new Date(task.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }} className="font-medium mb-2">
          Descripción
        </Text>
        <Text style={{ color: colors.textSecondary }} className="leading-5">
          {task.description || "Sin descripción"}
        </Text>
      </View>

      {/* Fecha límite */}
      <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }} className="font-medium mb-2">
          Fecha límite
        </Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.primary} />
          <Text style={{ color: colors.text }} className="ml-2">
            {task.dateLimit
              ? format(new Date(task.dateLimit), "d 'de' MMMM, yyyy", { locale: es })
              : "Sin fecha límite"}
          </Text>
        </View>
      </View>

      {/* Cambiar estado */}
      <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }} className="font-medium mb-4">
          Cambiar estado
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {Object.entries(statusConfig).map(([status, config]) => (
            <Pressable
              key={status}
              onPress={() => handleStatusChange(status as ETaskStatus)}
              className={`py-3 mb-3 rounded-lg items-center justify-center ${
                task.status === status ? "border-2" : ""
              }`}
              style={{
                width: "48%",
                backgroundColor: `${config.color}15`,
                borderColor: task.status === status ? config.color : "transparent"
              }}
              disabled={loadingUpdateTask}
            >
              <MaterialCommunityIcons name={config.icon as any} size={24} color={config.color} />
              <Text style={{ color: config.color }} className="mt-1 font-medium">
                {config.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Información adicional */}
      <View className="p-4 rounded-lg" style={{ backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }} className="font-medium mb-4">
          Información adicional
        </Text>
        <View className="mb-3">
          <Text style={{ color: colors.textSecondary }} className="mb-1">
            Asignado a
          </Text>
          <Text style={{ color: colors.text }}>{getAssignedName() || "No asignado"}</Text>
        </View>
        <View>
          <Text style={{ color: colors.textSecondary }} className="mb-1">
            Última actualización
          </Text>
          <Text style={{ color: colors.text }}>
            {format(new Date(task.updatedAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
          </Text>
        </View>
      </View>

      {loadingUpdateTask && (
        <View className="mt-4 items-center">
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={{ color: colors.textSecondary }} className="mt-2">
            Actualizando tarea...
          </Text>
        </View>
      )}

      {/* Modal de edición */}
      <MyModal
        title="Editar Tarea"
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
      >
        {task && (
          <FormEditTask
            task={task}
            setModalVisible={setEditModalVisible}
            onTaskUpdate={(updatedTaskData) => {
              const updatedTask: TaskModel = {
                ...task,
                ...updatedTaskData
              };
              updateTask(updatedTask);
            }}
          />
        )}
      </MyModal>
    </ScrollView>
  );
}
