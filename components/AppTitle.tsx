import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { images } from "utilities/images";
import { useRouter } from "expo-router";

export default function AppTitle() {
  const { business, loading, businessList, onChangeBusiness } = useBusinessStore();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 16 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background.dark.secondary
          }}
        />
        <View
          style={{
            width: 120,
            height: 20,
            backgroundColor: colors.background.dark.secondary,
            marginLeft: 16,
            borderRadius: 4
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 16 }}>
      <Image
        source={images.logo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20
        }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={() => businessList.length > 1 && setShowModal(true)}
      >
        <Text
          style={{
            color: colors.darkMode.text.dark,
            fontWeight: "bold",
            marginLeft: 16,
            fontSize: 20
          }}
        >
          {business?.name}
        </Text>
        {businessList.length > 1 && (
          <MaterialIcons name="arrow-drop-down" size={24} color={colors.darkMode.text.dark} />
        )}
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View
            style={{
              backgroundColor: colors.background.dark.primary,
              borderRadius: 8,
              padding: 16,
              width: "80%",
              maxHeight: "80%"
            }}
          >
            {businessList.map((b) => (
              <TouchableOpacity
                key={b.id}
                style={{
                  padding: 12
                }}
                onPress={() => {
                  onChangeBusiness(b.id!);
                  setShowModal(false);
                  router.replace("/(tabs)");
                }}
              >
                <Text
                  style={{
                    color: colors.darkMode.text.dark,
                    fontSize: 16
                  }}
                >
                  {b?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
