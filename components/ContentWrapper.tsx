import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ContentWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ContentWrapper = ({ children, style }: ContentWrapperProps) => {
  return (
    <View className="p-4 gap-4" style={style}>
      {children}
    </View>
  );
};
