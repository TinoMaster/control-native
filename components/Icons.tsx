import { IconProps } from "@expo/vector-icons/build/createIconSet";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import useColors from "hooks/useColors";

export const GridOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="grid" size={24} color={colors.primary} {...props} />;
};

export const WalletOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <FontAwesome6 name="hand-holding-dollar" size={24} color={colors.primary} {...props} />;
};

export const InputIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <FontAwesome6 name="box-archive" size={24} color={colors.primary} {...props} />;
};

export const AddIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="add" size={24} color={colors.primary} {...props} />;
};

export const StatsChartOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="stats-chart" size={24} color={colors.primary} {...props} />;
};

export const PersonOutlineIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="person-outline" size={24} color={colors.primary} {...props} />;
};
