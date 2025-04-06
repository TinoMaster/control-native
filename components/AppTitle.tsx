import { Image, Text, View } from "react-native";
import useColors from "hooks/useColors";
import { images } from "utilities/images";
import colors from "styles/colors";

export default function AppTitle() {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 16 }}
    >
      <Image
        source={images.logo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          color: colors.darkMode.text.dark,
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
