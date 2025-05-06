import { IconProps } from "@expo/vector-icons/build/createIconSet";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import useColors from "hooks/useColors";

export const AddIcon = (props: Omit<IconProps<string>, "name">) => {
  const colors = useColors();
  return <Ionicons name="add" size={24} color={colors.primary} {...props} />;
};

/* Icons for principal tabs */
export const GridIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="grid" size={size} color={color} />
);

export const WalletIcon = ({ color, size }: { color: string; size: number }) => (
  <FontAwesome6 name="hand-holding-dollar" size={size} color={color} />
);

export const EntryIcon = ({ color, size }: { color: string; size: number }) => (
  <FontAwesome6 name="arrow-right-to-bracket" size={size} color={color} />
);

export const StatsIcon = ({ color, size }: { color: string; size: number }) => (
  <FontAwesome6 name="people-group" size={size} color={color} />
);

export const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="person" size={size} color={color} />
);

// Icono para la pestaña de negocios
export const BusinessIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="business" size={size} color={color} />
);
