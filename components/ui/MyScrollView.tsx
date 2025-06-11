import { ScrollView } from "react-native";

export const MyScrollView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, gap: 16, minHeight: "100%" }}>
      {children}
    </ScrollView>
  );
};
