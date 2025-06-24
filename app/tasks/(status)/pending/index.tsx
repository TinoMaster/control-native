import { TaskItem } from "features/tasks/components/TaskItem";
import { useTasks } from "hooks/api/useTasks";
import useColors from "hooks/useColors";
import { ETaskStatus } from "models/api";
import { Text, View } from "react-native";

export default function PendingTasks() {
  const { tasks } = useTasks({ status: ETaskStatus.PENDING });
  const defaultColors = useColors();

  return (
    <>
      {tasks?.pages.some((page) => page.content.length > 0) ? (
        tasks.pages.map((page) => (
          <View style={{ gap: 10 }} key={page.page}>
            {page.content.map((task) => (
              <TaskItem key={task.id} item={task} />
            ))}
          </View>
        ))
      ) : (
        <View className="flex-1 justify-center items-center py-10">
          <Text style={{ color: defaultColors.text }} className="text-center">
            No hay tareas registradas
          </Text>
        </View>
      )}
    </>
  );
}
