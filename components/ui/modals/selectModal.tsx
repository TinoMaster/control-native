import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "contexts/ThemeContext";
import { BlurView } from "expo-blur";
import useColors from "hooks/useColors";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import colors from "styles/colors";

interface SelectModalProps<T> {
  readonly isVisible: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly data: T[];
  readonly isLoading?: boolean;
  readonly renderItem: (item: T, index: number) => React.ReactElement;
  readonly onSelect: (item: T) => void;
  readonly keyExtractor: (item: T, index: number) => string;
}

export function SelectModal<T>({
  isVisible,
  onClose,
  title,
  data,
  isLoading = false,
  renderItem,
  onSelect,
  keyExtractor
}: SelectModalProps<T>) {
  const defaultColors = useColors();
  const { isDarkMode } = useTheme();

  function handleItemPress(item: T) {
    onSelect(item);
    onClose();
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <BlurView intensity={isDarkMode ? 40 : 30} tint={isDarkMode ? "dark" : "light"} className="absolute inset-0" />
      <TouchableOpacity activeOpacity={1} onPress={onClose} className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      <SafeAreaView className="flex-1 justify-center items-center p-5">
        <View
          style={{
            backgroundColor: defaultColors.background,
            borderColor: colors.primary.light,
            borderWidth: 1,
            shadowColor: isDarkMode ? "#000" : "#888",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDarkMode ? 0.3 : 0.1,
            shadowRadius: 8,
            elevation: 5
          }}
          className="rounded-xl w-full max-h-[80%] overflow-hidden"
        >
          <View
            style={{
              borderBottomColor: isDarkMode ? colors.background.dark.secondary : colors.background.light.secondary,
              borderBottomWidth: 1,
              backgroundColor: isDarkMode ? colors.background.dark.secondary : colors.background.light.primary
            }}
            className="flex-row justify-between items-center p-4"
          >
            <Text
              style={{ color: isDarkMode ? colors.darkMode.text.light : colors.lightMode.text.dark }}
              className="text-lg font-semibold"
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: isDarkMode ? colors.background.dark.primary : colors.background.light.secondary,
                borderRadius: 20,
                padding: 6
              }}
            >
              <MaterialIcons
                name="close"
                size={22}
                color={isDarkMode ? colors.darkMode.text.light : colors.lightMode.text.dark}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-1 p-4">
            {isLoading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={colors.primary.light} />
                <Text
                  style={{
                    color: isDarkMode ? colors.darkMode.textSecondary.light : colors.lightMode.textSecondary.light
                  }}
                  className="mt-3 text-base"
                >
                  Cargando opciones...
                </Text>
              </View>
            ) : (
              <FlatList
                data={data}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ paddingBottom: 8 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    style={{
                      backgroundColor: isDarkMode ? colors.background.dark.primary : "#ffffff",
                      marginBottom: 8,
                      borderRadius: 8,
                      padding: 12,
                      borderLeftWidth: 3,
                      borderLeftColor: colors.primary.light
                    }}
                    className="active:opacity-80"
                  >
                    <Text
                      style={{ color: isDarkMode ? colors.darkMode.text.light : colors.lightMode.text.dark }}
                      className="text-base font-medium"
                    >
                      {renderItem(item, index)}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<EmptyListMessage emptyListMessage="No hay opciones disponibles." />}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function EmptyListMessage({ emptyListMessage }: { readonly emptyListMessage: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 justify-center items-center py-8">
      <MaterialIcons
        name="inbox"
        size={48}
        color={isDark ? colors.darkMode.textSecondary.light : colors.lightMode.textSecondary.light}
      />
      <Text
        style={{ color: isDark ? colors.darkMode.textSecondary.light : colors.lightMode.textSecondary.light }}
        className="text-base font-medium mt-3"
      >
        {emptyListMessage}
      </Text>
    </View>
  );
}
