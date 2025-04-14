import { Ionicons } from "@expo/vector-icons";
import { EmployeeCard } from "components/EmployeeCard";
import GenericList from "components/GenericList";
import LoadingPage from "components/LoadingPage";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";

export default function Personal() {
  const defaultColors = useColors();
  const router = useRouter();
  const { employees, loadingEmployees } = useEmployees();

  console.log("employees en el componente", employees);

  const renderEmployee = (employee: EmployeeModel) => (
    <EmployeeCard
      employee={employee}
      onPress={() => {
        if (employee.id) {
          router.push(`/(tabs)/entries/employees/${employee.id}` as any);
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
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: defaultColors.primary }]}
        onPress={() => router.push("/(tabs)/entries/services/create" as any)}
      >
        <Ionicons name="add" size={28} color={colors.darkMode.text.light} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
});
