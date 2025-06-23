import { Feather } from "@expo/vector-icons";
import { MiniCard } from "components/ui/cards/MiniCard";
import { format } from "date-fns";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { ETaskStatus, TaskModel } from "models/api";
import { Text, View } from "react-native";
import colors from "styles/colors";

interface TaskItemProps {
  readonly item: TaskModel;
  readonly onPress?: (task: TaskModel) => void;
}

export function TaskItem({ item, onPress }: TaskItemProps) {
  const defaultColors = useColors();
  const { getEmployeeById } = useEmployees();

  const employee = getEmployeeById(item.assignedToId);
  const getAssignedName = () => {
    if (employee) {
      return `${employee.user.name}`;
    }
    return "General";
  };

  // Get status color based on task status
  const getStatusColor = (status: ETaskStatus) => {
    switch (status) {
      case ETaskStatus.PENDING:
        return "#FFA500"; // Orange
      case ETaskStatus.IN_PROGRESS:
        return "#3498DB"; // Blue
      case ETaskStatus.COMPLETED:
        return "#2ECC71"; // Green
      case ETaskStatus.CANCELLED:
        return "#E74C3C"; // Red
      default:
        return defaultColors.textSecondary;
    }
  };

  // Get status text
  const getStatusText = (status: ETaskStatus) => {
    switch (status) {
      case ETaskStatus.PENDING:
        return "Pendiente";
      case ETaskStatus.IN_PROGRESS:
        return "En progreso";
      case ETaskStatus.COMPLETED:
        return "Completada";
      case ETaskStatus.CANCELLED:
        return "Cancelada";
      default:
        return "Desconocido";
    }
  };

  const getDateColorText = (date: Date, status: ETaskStatus) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const taskDate = new Date(date).setHours(0, 0, 0, 0);
    if (
      taskDate < today &&
      (status === ETaskStatus.PENDING || status === ETaskStatus.IN_PROGRESS)
    ) {
      return colors.error.dark;
    } else {
      return defaultColors.textSecondary;
    }
  };

  // Format date as DD/MM/YYYY
  const formatDate = (date: Date) => {
    if (!date) return "Sin fecha";
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <MiniCard accentColor={getStatusColor(item.status)}>
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <Text
            style={{ color: defaultColors.text }}
            className="text-base font-semibold flex-1 mr-2"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View
            className="px-2 py-1 rounded-md"
            style={{ backgroundColor: `${getStatusColor(item.status)}20` }}
          >
            <Text style={{ color: getStatusColor(item.status) }} className="text-xs font-medium">
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: defaultColors.textSecondary }}
          className="text-sm mt-1"
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-center">
            <Feather
              name="calendar"
              size={14}
              color={getDateColorText(item.dateLimit, item.status)}
            />
            <Text
              style={{ color: getDateColorText(item.dateLimit, item.status) }}
              className="text-xs ml-1"
            >
              Límite: {formatDate(item.dateLimit)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Feather name="user" size={14} color={defaultColors.textSecondary} />
            <Text style={{ color: defaultColors.textSecondary }} className="text-xs ml-1">
              {getAssignedName()}
            </Text>
          </View>
        </View>
      </View>
    </MiniCard>
  );
}
