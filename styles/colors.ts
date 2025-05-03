const colors = {
  background: {
    light: {
      primary: "#FFFFFF",
      secondary: "#F5F5F5"
    },
    dark: {
      primary: "#1A1A1A",
      secondary: "#232323"
    }
  },
  primary: {
    light: "#008e9e",
    dark: "#015c68"
  },
  secondary: {
    light: "#FF6B6B",
    dark: "#E64A4A"
  },
  third: {
    light: "#4CAF50",
    dark: "#388E3C"
  },
  success: {
    light: "#4CAF50",
    dark: "#388E3C"
  },
  warning: {
    light: "#FFC107",
    dark: "#FFA000"
  },
  error: {
    light: "#FF5722",
    dark: "#E64A4A"
  },
  darkMode: {
    text: {
      light: "#FFFFFF",
      dark: "#FEFEFE"
    },
    textSecondary: {
      light: "#9CA3AF",
      dark: "#6B7280"
    }
  },
  lightMode: {
    text: {
      light: "#1F2937",
      dark: "#1A1A1A"
    },
    textSecondary: {
      light: "#6B7280",
      dark: "#9CA3AF"
    }
  }
} as const;

export default colors;
