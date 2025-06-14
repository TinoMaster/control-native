import { Ionicons } from "@expo/vector-icons";
import { MiniCard } from "components/ui/cards/MiniCard";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmployeeCardProps {
  readonly employee: EmployeeModel;
  readonly onPress?: () => void;
}

export function EmployeeCard({ employee, onPress }: EmployeeCardProps) {
  const colors = useColors();

  return (
    <MiniCard>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{employee.user.name}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{employee.user.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </View>

        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Ionicons name="call-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>{employee.phone}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="card-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>DNI: {employee.dni}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]} numberOfLines={1}>
              {employee.address.street} {employee.address.number}, {employee.address.city}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.salaryContainer}>
            <View style={styles.infoContainer}>
              <Ionicons name="cash-outline" size={16} color={colors.primary} />
              <Text style={[styles.salaryText, { color: colors.primary }]}>
                Fijo: ${employee.fixedSalary.toFixed(2)}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="trending-up-outline" size={16} color={colors.primary} />
              <Text style={[styles.salaryText, { color: colors.primary }]}>Comisión: {employee.percentSalary}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MiniCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4
  },
  content: {
    marginBottom: 12,
    gap: 6
  },
  footer: {
    marginTop: 8
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8
  },
  salaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  salaryText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8
  }
});
