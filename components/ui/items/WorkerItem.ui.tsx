import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { Text, View } from "react-native";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export function WorkerItem({
  worker,
  workersAndSalaries
}: {
  readonly worker: EmployeeModel;
  readonly workersAndSalaries: Record<string, number>;
}) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="py-2 flex-row justify-between"
    >
      <Text style={{ color: defaultColors.text }} className="font-medium">
        {worker.user.name}
      </Text>
      <Text style={{ color: defaultColors.text }} className="font-medium">
        {formatCurrency(workersAndSalaries[worker.user.name])}
      </Text>
    </View>
  );
}
