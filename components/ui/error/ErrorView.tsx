import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ErrorViewProps {
  /**
   * Título principal del error
   * @default "No se pudo cargar la información"
   */
  title?: string;

  /**
   * Mensaje descriptivo del error
   * @default "La información solicitada no existe o no está disponible en este momento."
   */
  message?: string;

  /**
   * Texto del botón de acción
   * @default "Volver"
   */
  buttonText?: string;

  /**
   * Icono a mostrar (nombre del icono de MaterialCommunityIcons)
   * @default "alert-circle-outline"
   */
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;

  /**
   * Tamaño del icono
   * @default 56
   */
  iconSize?: number;

  /**
   * Función a ejecutar al presionar el botón
   * @default router.back()
   */
  onButtonPress?: () => void;

  /**
   * Mostrar u ocultar el botón de acción
   * @default true
   */
  showButton?: boolean;
}

/**
 * Componente para mostrar errores de carga o información no disponible
 * con un diseño moderno y profesional
 */
export const ErrorView: React.FC<ErrorViewProps> = ({
  title = "No se pudo cargar la información",
  message = "La información solicitada no existe o no está disponible en este momento.",
  buttonText = "Volver",
  iconName = "alert-circle-outline",
  iconSize = 56,
  onButtonPress,
  showButton = true
}) => {
  const colors = useColors();
  const router = useRouter();

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${colors.error}15` }}
      >
        <MaterialCommunityIcons name={iconName} size={iconSize} color={colors.error} />
      </View>

      <Text style={{ color: colors.text }} className="text-xl font-bold mt-2 text-center">
        {title}
      </Text>

      <Text style={{ color: colors.textSecondary }} className="text-center mt-3 max-w-xs leading-5">
        {message}
      </Text>

      {showButton && (
        <Pressable
          onPress={handleButtonPress}
          className="mt-8 py-3 px-6 rounded-lg"
          style={{
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5
          }}
        >
          <Text className="text-white font-medium">{buttonText}</Text>
        </Pressable>
      )}
    </View>
  );
};
