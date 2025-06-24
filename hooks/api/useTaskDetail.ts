import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ETaskStatus, TaskModel } from "models/api";
import { taskService } from "services/task.service";

export function useTaskDetail(taskId: number | string) {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading: loadingTask,
    error,
    refetch
  } = useQuery({
    queryKey: ["task", "detail", taskId],
    queryFn: async () => {
      if (!taskId) return null;

      const response = await taskService.getTaskById(Number(taskId));

      if (response.status === 200 && response.data) {
        return response.data;
      }

      return null;
    },
    enabled: !!taskId
  });

  const { mutate: updateTask, isPending: loadingUpdateTask } = useMutation({
    mutationFn: (updatedTask: TaskModel) => taskService.updateTask(updatedTask),
    onSuccess: (response) => {
      if (response.status === 200 && response.data) {
        showNotification("Tarea actualizada correctamente", "success");

        // Invalidar la consulta de detalle de la tarea actual
        queryClient.invalidateQueries({ queryKey: ["task", "detail", taskId] });

        // Invalidar todas las consultas de tareas para actualizar las listas
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else {
        showNotification(
          "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
          "error"
        );
      }
    },
    onError: () => {
      showNotification(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
        "error"
      );
    }
  });

  const updateTaskStatus = (newStatus: ETaskStatus) => {
    if (!task) return;

    const updatedTask: TaskModel = {
      ...task,
      status: newStatus
    };

    updateTask(updatedTask);
  };

  return {
    task,
    loadingTask,
    error,
    refetch,
    updateTask,
    updateTaskStatus,
    loadingUpdateTask
  };
}
