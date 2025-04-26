import useColors from "hooks/useColors";
import React from "react";
import { FieldError } from "react-hook-form";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import colors from "styles/colors";

interface GenericInputProps {
  readonly label: string;
  readonly placeholder: string;
  readonly keyboardType: KeyboardTypeOptions;
  readonly watch: string | undefined;
  readonly error: FieldError | undefined;
  readonly onChangeText: (text: string) => void;
  readonly multiline?: boolean;
  readonly numberOfLines?: number;
}

export function GenericInput({
  label,
  placeholder,
  keyboardType,
  watch,
  error,
  onChangeText,
  multiline = false,
  numberOfLines = 4
}: GenericInputProps) {
  const defaultColors = useColors();
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: defaultColors.text,
          marginBottom: 8
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: colors.background.light.primary,
          padding: 12,
          borderRadius: 8,
          color: colors.lightMode.text.dark
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.lightMode.textSecondary.light}
        keyboardType={keyboardType}
        value={watch ?? ""}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{error.message}</Text>}
    </View>
  );
}

// Named export as per rules
export default GenericInput; // Keep default for easier dynamic imports if needed elsewhere.
