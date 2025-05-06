import { Feather } from "@expo/vector-icons";
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

/* Icons for principal tabs */
export const GridIcon = ({ color, size }: { color: string; size: number }) => (
  <GridOutlineIcon size={size} color={color} />
);

export const WalletIcon = ({ color, size }: { color: string; size: number }) => (
  <WalletOutlineIcon size={size} color={color} />
);

export const EntryIcon = ({ color, size }: { color: string; size: number }) => <InputIcon size={size} color={color} />;

export const StatsIcon = ({ color, size }: { color: string; size: number }) => (
  <PeopleGroupIcon size={size} color={color} />
);

export const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <PersonIcon size={size} color={color} />
);

// Icono para la pestaña de negocios
export const BusinessIcon = ({ color, size }: { color: string; size: number }) => (
  <Feather name="briefcase" size={size} color={color} />
);
