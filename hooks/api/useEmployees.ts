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

  console.log("Business ID actual:", businessId);

  const { data: employees = [], isLoading: loadingEmployees } = useQuery({
    queryKey: ["employees", businessId],
    queryFn: async () => {
      if (!businessId) {
        console.warn("No hay businessId disponible para la consulta");
        return [];
      }
      console.log("Ejecutando consulta con businessId:", businessId);
      const response = await employeeService.getEmployeesByBusinessId(businessId);
      console.log("Datos recibidos del API:", response.data);
      return response.data || [];
    },
    /* select: (data) => {
      console.log("Datos antes de ordenar:", data);
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn("No hay datos para ordenar o no es un array");
        return [];
      }
      try {
        // Verificar que cada elemento tenga la propiedad user.name
        const validData = data.filter(item => Boolean(item?.user?.name));
        console.log("Datos válidos para ordenar:", validData.length);
        return validData.toSorted((a, b) => b.user.name.localeCompare(a.user.name));
      } catch (error) {
        console.error("Error al ordenar los datos:", error);
        return data;
      }
    }, */
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
