import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { EmployeeModel } from "models/api/employee.model";
import { employeeService } from "services/employee.service";
import { useBusinessStore } from "store/business.store";

export const useEmployees = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const router = useRouter();

  const { data: employees = [], isLoading: loadingEmployees } = useQuery({
    queryKey: ["employees", businessId],
    queryFn: async () => {
      if (!businessId) {
        return [];
      }
      const response = await employeeService.getEmployeesByBusinessId(businessId);
      return response.data || [];
    },
    enabled: !!businessId
  });

  const { mutate: saveEmployee, isPending: loadingSave } = useMutation({
    mutationFn: (employee: EmployeeModel) => employeeService.saveEmployee(employee),
    onSuccess: () => {
      showNotification("Empleado guardado correctamente", "success");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      router.replace("/(tabs)/personal");
    },
    onError: () => {
      showNotification("Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.", "error");
    }
  });

  return {
    employees,
    loadingEmployees,
    saveEmployee,
    loadingSave
  };
};
