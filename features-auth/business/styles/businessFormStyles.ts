import colors from "styles/colors";
import { StyleSheet } from "react-native";

export const businessFormStyles = StyleSheet.create({
  title: {
    color: colors.darkMode.text.light,
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold" as const
  },
  text: {
    color: colors.darkMode.text.light
  },
  label: {
    color: colors.darkMode.text.dark,
    marginBottom: 4,
    fontSize: 13
  }
});
