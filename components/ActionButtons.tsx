import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";

interface ActionButton {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  fixed?: boolean;
  position?: "bottom" | "top";
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  fixed = false,
  position = "bottom",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setIsExpanded(!isExpanded);
  };

  if (fixed) {
    return (
      <View style={[styles.containerFixed, { backgroundColor: colors.background.dark.primary }]}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.label}
            style={[
              styles.actionButtonFixed,
              { backgroundColor: button.color ?? colors.background.dark.secondary },
            ]}
            onPress={button.onPress}
          >
            <Ionicons name={button.icon} size={16} color="white" />
            <Text style={styles.actionButtonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, position === "bottom" ? styles.bottom : styles.top]}>
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: colors.background.dark.secondary }]}
        onPress={toggleExpanded}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="white" />
      </TouchableOpacity>

      {buttons.map((button) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(buttons.indexOf(button) + 1) * 50],
        });

        return (
          <Animated.View
            key={button.label}
            style={[
              styles.actionButton,
              { backgroundColor: button.color ?? colors.background.dark.secondary },
              {
                transform: [{ translateY }],
                opacity: animation,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => {
                toggleExpanded();
                setTimeout(() => {
                  if (isExpanded) {
                    button.onPress();
                  }
                }, 100);
              }}
            >
              <Ionicons name={button.icon} size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerFixed: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    backgroundColor: colors.background.dark.primary,
  },
  actionButtonFixed: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: colors.background.dark.secondary,
  },
  container: {
    position: "absolute",
    right: 24,
    zIndex: 1000,
  },
  bottom: {
    bottom: 16,
  },
  top: {
    top: 16,
  },
  mainButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  actionButton: {
    position: "absolute",
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 4,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
