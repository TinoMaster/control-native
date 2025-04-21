import { Platform } from "react-native";

/**
 * Función para generar estilos de sombra multiplataforma
 * @param elevation - Nivel de elevación para Android (default: 5)
 * @param opacity - Opacidad de la sombra para iOS (default: 0.1)
 * @param radius - Radio de la sombra para iOS (default: 3.84)
 * @param color - Color de la sombra (default: "#000")
 * @param offsetX - Desplazamiento X de la sombra (default: 0)
 * @param offsetY - Desplazamiento Y de la sombra (default: 2)
 * @returns Objeto de estilo con sombras para cada plataforma
 */
export function getShadowStyle({
  elevation = 5,
  opacity = 0.1,
  radius = 3.84,
  color = "#000",
  offsetX = 0,
  offsetY = 2
} = {}) {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: {
        width: offsetX,
        height: offsetY
      },
      shadowOpacity: opacity,
      shadowRadius: radius
    },
    android: {
      elevation
    },
    web: {
      boxShadow: `${offsetX}px ${offsetY}px ${radius}px rgba(0, 0, 0, ${opacity})`
    }
  });
}

/**
 * Estilos de sombra predefinidos
 */
export const shadowStyles = {
  // Sombra por defecto para tarjetas
  card: getShadowStyle(),

  // Sombra por defecto para contenedores
  container: getShadowStyle(),

  // Sombra por defecto para botones
  button: getShadowStyle({
    elevation: 4,
    opacity: 0.25,
    radius: 3.84,
    color: "#000",
    offsetX: 0,
    offsetY: 2
  }),

  // Sombra más pronunciada para elementos elevados
  elevated: getShadowStyle({
    elevation: 8,
    opacity: 0.2,
    radius: 5,
    offsetY: 3
  }),

  // Sombra sutil para elementos con poca elevación
  subtle: getShadowStyle({
    elevation: 2,
    opacity: 0.05,
    radius: 2,
    offsetY: 1
  })
};
