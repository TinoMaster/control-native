import { EmployeeModel } from "models/api/employee.model";
import { Text, View } from "react-native";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";

export function WorkerItem({
  worker,
  workersAndSalaries
}: {
  readonly worker: EmployeeModel;
  readonly workersAndSalaries: Record<string, number>;
}) {
  return (
    <View className="py-2 flex-row justify-between">
      <Text style={{ color: colors.darkMode.text.light }} className="font-medium">
        {worker.user.name}
      </Text>
      <Text style={{ color: colors.darkMode.text.light }} className="font-medium">
        {formatCurrency(workersAndSalaries[worker.user.name])}
      </Text>
    </View>
  );
}
