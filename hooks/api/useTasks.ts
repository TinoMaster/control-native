import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { ETaskStatus, TaskModel } from "models/api";
import { PaginationRequest } from "models/api/requests/paginationRequest.model";
import { taskService } from "services/task.service";
import { useBusinessStore } from "store/business.store";

export function useTasks({ status }: { status?: ETaskStatus }) {
  const businessId = useBusinessStore((state) => state.businessId);
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const emptyPaginationResponse: PaginationRequest<TaskModel> = {
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
  };

  const {
    data: tasks,
    isLoading: loadingTasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PaginationRequest<TaskModel>>({
    queryKey: ["tasks", "byBusinessAndStatus", businessId],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 1 }) => {
      if (!businessId) {
        return emptyPaginationResponse;
      }

      if (!status) {
        const response = await taskService.getTasksByBusinessId({
          businessId: String(businessId),
          page: pageParam as number,
          size: 10
        });

        return response.data ?? emptyPaginationResponse;
      }

      const response = await taskService.getTaskByBusinessIdAndStatus({
        businessId: String(businessId),
        status,
        page: pageParam as number,
        size: 10
      });

      return response.data ?? emptyPaginationResponse;
    },
    getNextPageParam: (lastPage: PaginationRequest<TaskModel>) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    enabled: !!businessId
  });

  const { mutate: saveTask, isPending: loadingSaveTask } = useMutation({
    mutationFn: (task: TaskModel) => taskService.createTask(task),
    onSuccess: (response) => {
      if (response.status === 200 && response.data) {
        showNotification("Tarea guardada correctamente", "success");
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

  return {
    tasks,
    loadingTasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    saveTask,
    loadingSaveTask
  };
}
