import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";

export const BackButtonPlusTitle = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)"
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginRight: 16
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.darkMode.text.light} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "600", color: colors.darkMode.text.light }}>{title}</Text>
    </View>
  );
};
