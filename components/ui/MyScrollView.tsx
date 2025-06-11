import { ScrollView } from "react-native";

export const MyScrollView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 16, minHeight: "100%" }}>
      {children}
    </ScrollView>
  );
};
