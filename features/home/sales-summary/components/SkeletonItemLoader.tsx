import useColors from "hooks/useColors";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from "react-native-reanimated";
interface SkeletonLoaderProps {
  readonly color: string;
}

export const SkeletonItemLoader = ({ color }: SkeletonLoaderProps) => {
  const defaultColors = useColors();
  const prefersReducedMotion = useReducedMotion();

  // Valores animados compartidos
  const iconOpacity = useSharedValue(0.5);
  const valueOpacity = useSharedValue(0.5);
  const labelOpacity = useSharedValue(0.5);

  // Configurar animaciones
  if (!prefersReducedMotion) {
    iconOpacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);

    valueOpacity.value = withRepeat(withDelay(200, withTiming(0.8, { duration: 1000 })), -1, true);

    labelOpacity.value = withRepeat(withDelay(400, withTiming(0.8, { duration: 1000 })), -1, true);
  }

  // Estilos animados
  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value
  }));

  const valueStyle = useAnimatedStyle(() => ({
    opacity: valueOpacity.value
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value
  }));

  return (
    <>
      <View className="w-9 h-9 rounded-full items-center justify-center mb-1" style={{ backgroundColor: `${color}20` }}>
        <Animated.View
          style={[
            {
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: color,
              opacity: prefersReducedMotion ? 0.7 : undefined
            },
            iconStyle
          ]}
        />
      </View>
      <Animated.View
        style={[
          {
            width: "70%",
            height: 24,
            borderRadius: 4,
            backgroundColor: defaultColors.textSecondary,
            marginBottom: 4,
            opacity: prefersReducedMotion ? 0.7 : undefined
          },
          valueStyle
        ]}
      />
      <Animated.View
        style={[
          {
            width: "50%",
            height: 14,
            borderRadius: 2,
            backgroundColor: defaultColors.textSecondary,
            opacity: prefersReducedMotion ? 0.7 : undefined
          },
          labelStyle
        ]}
      />
    </>
  );
};
