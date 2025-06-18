import { StyleProp, View, ViewStyle } from "react-native";

interface ContentWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  withHeader?: boolean;
  withFooter?: boolean;
}

export const ContentWrapper = ({
  children,
  style,
  withHeader = true,
  withFooter = false
}: ContentWrapperProps) => {
  return (
    <View
      className="p-4 gap-4"
      style={[
        { flex: 1, paddingTop: withHeader ? 66 : 15, paddingBottom: withFooter ? 66 : 15 },
        style
      ]}
    >
      {children}
    </View>
  );
};
