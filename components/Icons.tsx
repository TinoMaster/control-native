import useColors from "hooks/useColors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";

export const GridOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return (
    <Ionicons name="grid-outline" size={24} color={colors.primary} {...props} />
  );
};

export const WalletOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return (
    <Ionicons
      name="wallet-outline"
      size={24}
      color={colors.primary}
      {...props}
    />
  );
};

export const AddIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="add" size={24} color={colors.primary} {...props} />;
};

export const StatsChartOutlineIcon = (
  props: Omit<IconProps<string>, "name">
) => {
  const colors = useColors();
  return (
    <Ionicons
      name="stats-chart-outline"
      size={24}
      color={colors.primary}
      {...props}
    />
  );
};

export const PersonOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return (
    <Ionicons
      name="person-outline"
      size={24}
      color={colors.primary}
      {...props}
    />
  );
};
