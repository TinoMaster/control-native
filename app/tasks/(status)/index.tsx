import { SearchFilter } from "components/ui/SearchFilter";
import { TaskItem } from "features/tasks/components/TaskItem";
import { useTasks } from "hooks/api/useTasks";
import useColors from "hooks/useColors";
import { TaskModel } from "models/api";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function Tasks() {
  const { tasks } = useTasks({});
  const defaultColors = useColors();
  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);

  const allTasks = useMemo(() => {
    if (!tasks?.pages) return [];
    return tasks.pages.flatMap((page) => page.content);
  }, [tasks]);

  const handleFilteredDataChange = (filtered: TaskModel[]) => {
    setFilteredTasks(filtered);
  };

  const tasksToDisplay = useMemo(() => {
    if (filteredTasks.length > 0) {
      return filteredTasks;
    }
    return allTasks;
  }, [filteredTasks, allTasks]);

  return (
    <>
      <SearchFilter
        data={allTasks}
        searchFields={["title", "description"]}
        placeholder="Buscar tareas..."
        onFilteredDataChange={handleFilteredDataChange}
        containerStyle={{ marginBottom: 8 }}
      />

      {tasksToDisplay.length > 0 ? (
        <View style={{ gap: 10 }}>
          {tasksToDisplay.map((task) => (
            <TaskItem key={task.id} item={task} />
          ))}
        </View>
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
