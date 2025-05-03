import useColors from "hooks/useColors";
import { MachineModel } from "models/api/machine.model";
import { Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

export function MachineItem({ machineId, machine }: { readonly machineId?: number; readonly machine?: MachineModel }) {
  const defaultColors = useColors();
  const business = useBusinessStore((state) => state.business);
  const { machines } = business;

  return (
    <View style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }} className="py-2">
      <Text style={{ color: defaultColors.text }} className="font-medium">
        {machine?.name ?? machines?.find((machine) => machine.id === machineId)?.name}
      </Text>
    </View>
  );
}
