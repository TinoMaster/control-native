import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AdditionalInfo } from "features/personal/personal-detail/AdditionalInfo";
import { AddressSection } from "features/personal/personal-detail/address/AddressSection";
import { BusinessesSection } from "features/personal/personal-detail/businesses/BusinessesSection";
import { ContactSection } from "features/personal/personal-detail/contact/ContactSection";
import { PrincipalInfo } from "features/personal/personal-detail/principal-info/PrincipalInfo";
import { SalarySection } from "features/personal/personal-detail/salary/SalarySection";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { businessFinalSaleService } from "services/businessFinalSale.service";
import { useModalStore } from "store/modal.store";
import colors from "styles/colors";

export default function EmployeeDetails() {
  const { id } = useLocalSearchParams();
  const defaultColors = useColors();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { loadingEmployees, getEmployeeById, deleteEmployee, loadingDelete } = useEmployees();
  const [existEmployeeInFinalSale, setExistEmployeeInFinalSale] = useState<boolean>(true);
  const { showConfirm, showAlert } = useModalStore();

  useEffect(() => {
    const existEmployeeInAnyBusinessFinalSale = async (employeeId: string) => {
      const response = await businessFinalSaleService.existEmployeeInAnyBusinessFinalSale(employeeId);
      setExistEmployeeInFinalSale(response.data?.response ?? false);
    };
    existEmployeeInAnyBusinessFinalSale(id as string);
  }, [id]);

  if (loadingEmployees) {
    return <LoadingPage message="Cargando detalles del empleado..." />;
  }

  const employee = getEmployeeById(Number(id));

  if (!employee) {
    showNotification("Empleado no encontrado", "error");
    router.back();
    return null;
  }

  const onDeleteEmployee = (employeeId: string) => {
    if (existEmployeeInFinalSale) {
      showAlert("No se puede eliminar", "El empleado solo puede ser desactivado ya que pertenece a reportes pasados.");
      return;
    }

    showConfirm("Eliminar empleado", "¿Estás seguro de eliminar este empleado?", {
      onConfirm: () => {
        deleteEmployee(employeeId, {
          onSuccess: () => {
            showNotification("Empleado eliminado", "success");
            router.back();
          },
          onError: () => {
            showNotification(
              "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente.",
              "error"
            );
          }
        });
      }
    });
  };

  if (loadingDelete) {
    return <LoadingPage message="Eliminando empleado..." />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: defaultColors.background }}>
      <BackButtonPlusTitle title="Detalles del Empleado" />

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Información Principal */}
        <PrincipalInfo employee={employee} />

        {/* Contacto */}
        <ContactSection employee={employee} />

        {/* Dirección */}
        <AddressSection employee={employee} />

        {/* Salario */}
        <SalarySection employee={employee} />

        {/* Negocios Asignados */}
        <BusinessesSection employee={employee} />

        {/* Información Adicional */}
        <AdditionalInfo employee={employee} />
      </ScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            label: "Eliminar",
            onPress: () => onDeleteEmployee(employee.id),
            color: !existEmployeeInFinalSale ? colors.error.dark : `${colors.error.dark}50`
          }
        ]}
        fixed
      />
    </View>
  );
}
