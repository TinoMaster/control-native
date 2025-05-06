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
  return <FontAwesome6 name="arrow-right-to-bracket" size={24} color={colors.primary} {...props} />;
};

export const AddIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="add" size={24} color={colors.primary} {...props} />;
};

export const PeopleGroupIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <FontAwesome6 name="people-group" size={24} color={colors.primary} {...props} />;
};

export const PersonIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="person" size={24} color={colors.primary} {...props} />;
};
