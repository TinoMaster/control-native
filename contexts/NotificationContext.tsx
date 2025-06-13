import { Ionicons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { readonly children: React.ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const colors = useColors();

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info") => {
      setNotification({ message, type });
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        setNotification(null);
      });
    },
    [fadeAnim]
  );

  const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
      case "success":
        return { backgroundColor: "#4CAF50" };
      case "error":
        return { backgroundColor: "#F44336" };
      case "warning":
        return { backgroundColor: "#FF9800" };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getIconName = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "warning";
      default:
        return "information-circle";
    }
  };

  const contextValue = useMemo(() => ({ showNotification }), [showNotification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Animated.View
          style={[
            styles.notificationContainer,
            getNotificationStyle(notification.type),
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0]
                  })
                }
              ]
            }
          ]}
        >
          <View style={styles.notificationContent}>
            <Ionicons name={getIconName(notification.type)} size={24} color="white" />
            <Text style={styles.notificationText}>{notification.message}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
              }).start(() => {
                setNotification(null);
              });
            }}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  notificationText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    flex: 1
  }
});
