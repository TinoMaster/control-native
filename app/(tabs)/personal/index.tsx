import { EmployeeCard } from "components/EmployeeCard";
import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { StyleSheet, View } from "react-native";
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
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
