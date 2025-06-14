import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import { PageTitle } from "components/PageTitle";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useRouter } from "expo-router";
import { EmployeeCard } from "features/personal/EmployeeCard";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import colors from "styles/colors";

export default function Personal() {
  const defaultColors = useColors();
  const router = useRouter();
  const { employees, loadingEmployees } = useEmployees();

  const renderEmployee = (employee: EmployeeModel) => (
    <EmployeeCard
      employee={employee}
      onPress={() => {
        if (employee.id) {
          router.push(`/(tabs)/personal/${employee.id}` as any);
        }
      }}
    />
  );

  if (loadingEmployees) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <PageTitle title="Personal" />
      <GenericList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage="No hay empleados registrados"
      />
      <FloatingActionButton
        onPress={() => router.push("/(tabs)/personal/create" as any)}
        backgroundColor={defaultColors.primary}
        iconColor={colors.darkMode.text.light}
      />
    </GradientBackground>
  );
}
