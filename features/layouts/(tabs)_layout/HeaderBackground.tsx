import { ImageBackground, View } from "react-native";

export function HeaderBackground() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("assets/images/header-bg.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
      <View
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        }}
      />
    </View>
  );
}
