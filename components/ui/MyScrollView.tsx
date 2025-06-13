import { ScrollView } from "react-native";

export const MyScrollView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      {children}
    </ScrollView>
  );
};
