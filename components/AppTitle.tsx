import { Image, Text, View } from "react-native";
import useColors from "hooks/useColors";

export default function AppTitle() {
  const colors = useColors();
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 16 }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          color: colors.text,
          fontWeight: "bold",
          marginLeft: 16,
          fontSize: 20,
        }}
      >
        Control
      </Text>
    </View>
  );
}
