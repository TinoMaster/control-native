import MiniLoader from "components/ui/loaders/MiniLoader";
import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { EmployeeModel } from "models/api/employee.model";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { employeeService } from "services/employee.service";

interface Props {
  readonly business: BusinessModel;
}

export function UsersInfo({ business }: Props) {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState(false);
  const defaultColors = useColors();

  const getEmployees = async () => {
    setLoading(true);
    if (!business.id) return;
    const employees = await employeeService.getEmployeesByBusinessId(business.id);

    if (employees.status === 200 && employees.data) {
      setEmployees(employees.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <MyCard title="Usuarios" iconTitle="people-outline" iconButton="add">
      {loading ? (
        <MiniLoader message="Cargando usuarios..." size="small" />
      ) : (
        <>
          {employees.slice(0, 3).map((employee, index) => (
            <View
              key={employee.id ?? index}
              className="flex-row justify-between items-center py-3 border-b border-gray-200/20"
            >
              <View className="flex-row items-center">
                <Text style={{ color: defaultColors.text }} className="text-base mr-2">
                  {employee.user.name}
                </Text>
                <View
                  className="w-2 h-2 rounded-full ml-2"
                  style={{ backgroundColor: employee.user.active ? "#4ADE80" : "#F87171" }}
                />
              </View>
              <Text style={{ color: employee.user.active ? "#4ADE80" : "#F87171" }} className="text-sm">
                {employee.user.active ? "Activo" : "Inactivo"}
              </Text>
            </View>
          ))}
          {employees.length > 3 && (
            <TouchableOpacity className="mt-2 items-center py-2">
              <Text style={{ color: defaultColors.primary }} className="text-sm font-medium">
                Ver todos los usuarios
              </Text>
            </TouchableOpacity>
          )}

          {!employees.length && (
            <Text style={{ color: defaultColors.textSecondary, textAlign: "center" }} className="text-base">
              No tienes usuarios registrados
            </Text>
          )}
        </>
      )}
    </MyCard>
  );
}
