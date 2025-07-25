import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";

export function MachineItem({
  machineId,
  machine
}: {
  readonly machineId?: number;
  readonly machine?: MachineModel;
}) {
  const business = useBusinessStore((state) => state.business);
  const { machines } = business;

  const defaultColors = useColors();

  return (
    <View className="py-2">
      <Text style={{ color: defaultColors.text }} className="font-medium">
        {machine?.name ?? machines?.find((machine) => machine.id === machineId)?.name}
      </Text>
    </View>
  );
}
