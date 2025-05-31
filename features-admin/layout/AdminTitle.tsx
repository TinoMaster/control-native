import { Image, Text, View } from "react-native";
import colors from "styles/colors";
import { images } from "utilities/images";

export const AdminTitle = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={images.logo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: colors.darkMode.text.dark,
            fontWeight: "bold",
            marginLeft: 16,
            fontSize: 20
          }}
        >
          Gestión de la App
        </Text>
      </View>
    </View>
  );
};
