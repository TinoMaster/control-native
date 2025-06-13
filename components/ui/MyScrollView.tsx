import { ScrollView, StyleProp, ViewStyle } from "react-native";
interface MyScrollViewProps {
  readonly children: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

export const MyScrollView = ({ children, style }: MyScrollViewProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1" style={style}>
      {children}
    </ScrollView>
  );
};
