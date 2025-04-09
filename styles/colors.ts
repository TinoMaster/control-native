const colors = {
  background: {
    light: {
      primary: "#FFFFFF",
      secondary: "#F5F5F5",
    },
    dark: {
      primary: "#1A1A1A",
      secondary: "#2D2D2D",
    },
  },
  primary: {
    light: "#027483",
    dark: "#015c68",
  },
  secondary: {
    light: "#FF6B6B",
    dark: "#E64A4A",
  },
  third: {
    light: "#4CAF50",
    dark: "#388E3C",
  },
  darkMode: {
    text: {
      light: "#FFFFFF",
      dark: "#FEFEFE",
    },
    textSecondary: {
      light: "#6B7280",
      dark: "#9CA3AF",
    },
  },
  lightMode: {
    text: {
      light: "#2D2D2D",
      dark: "#1A1A1A",
    },
    textSecondary: {
      light: "#6B7280",
      dark: "#9CA3AF",
    },
  },
} as const;

export default colors;
