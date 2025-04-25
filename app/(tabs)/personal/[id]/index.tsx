import { Ionicons } from "@expo/vector-icons";
import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { shadowStyles } from "styles/shadows";

export default function EmployeeDetails() {
  const { id } = useLocalSearchParams();
  const defaultColors = useColors();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { loadingEmployees, getEmployeeById, deleteEmployee, loadingDelete } = useEmployees();

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
  };

  if (loadingDelete) {
    return <LoadingPage message="Eliminando empleado..." />;
  }

  // Helper para formatear la dirección completa
  const formatAddress = () => {
    const address = employee.address;
    if (!address) return "No disponible";
    return `${address.street} ${address.number}, ${address.municipality}, ${address.city}, ${address.zip}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <BackButtonPlusTitle title="Detalles del Empleado" />

        {/* Información Principal */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <Text style={[styles.employeeName, { color: defaultColors.text }]}>{employee.user.name}</Text>
          <Text style={[styles.employeeEmail, { color: defaultColors.primary }]}>{employee.user.email}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={18} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>Rol: {employee.user.role}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name={employee.user.active ? "checkmark-circle-outline" : "close-circle-outline"}
              size={18}
              color={employee.user.active ? "#4CAF50" : "#F44336"}
            />
            <Text style={[styles.infoText, { color: employee.user.active ? "#4CAF50" : "#F44336" }]}>
              {employee.user.active ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>

        {/* Información de Contacto */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="id-card-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Identificación y Contacto</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={18} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>DNI: {employee.dni}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>Teléfono: {employee.phone}</Text>
          </View>
        </View>

        {/* Dirección */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Dirección</Text>
          </View>
          <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>{formatAddress()}</Text>
        </View>

        {/* Salario */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cash-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información Salarial</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="wallet-outline" size={18} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Salario fijo: ${employee.fixedSalary.toFixed(2)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="trending-up-outline" size={18} color={defaultColors.textSecondary} />
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Comisión: {employee.percentSalary}%
            </Text>
          </View>
        </View>

        {/* Negocios Asignados */}
        {employee.user.businesses && employee.user.businesses.length > 0 && (
          <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="business-outline" size={24} color={defaultColors.primary} />
              <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>
                Negocios Asignados ({employee.user.businesses.length})
              </Text>
            </View>
            {employee.user.businesses.map((business) => (
              <View key={business.id} style={styles.businessItem}>
                <Ionicons name="ellipse" size={8} color={defaultColors.textSecondary} style={styles.bulletIcon} />
                <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>{business.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Información Adicional */}
        <View style={[styles.card, { backgroundColor: defaultColors.background }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color={defaultColors.primary} />
            <Text style={[styles.sectionTitle, { color: defaultColors.text }]}>Información Adicional</Text>
          </View>
          {employee.user.createdAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Creado: {new Date(employee.user.createdAt).toLocaleDateString()}
            </Text>
          )}
          {employee.user.updatedAt && (
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Última actualización: {new Date(employee.user.updatedAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            label: "Eliminar",
            onPress: () => onDeleteEmployee(employee.id),
            color: "#F44336"
          }
        ]}
        fixed={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    padding: 16
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...shadowStyles.card
  },
  employeeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4
  },
  employeeEmail: {
    fontSize: 16,
    marginBottom: 12
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingBottom: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    lineHeight: 20
  },
  businessItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6
  },
  bulletIcon: {
    marginRight: 8,
    marginTop: 6
  }
});
