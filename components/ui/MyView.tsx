import { View } from "react-native";

interface MyViewProps {
  children: React.ReactNode;
  className?: string;
}

export const MyView = ({ children, className }: MyViewProps) => {
  return <View className={`${className} flex-1`}>{children}</View>;
};
