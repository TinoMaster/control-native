import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import colors from "styles/colors";

interface CustomInputProps extends TextInputProps {
  readonly label?: string;
  readonly error?: string;
  readonly icon?: string;
  readonly iconComponent?: React.ReactNode;
  readonly isPassword?: boolean;
  readonly disabled?: boolean;
}

export function CustomInput({
  label,
  error,
  icon,
  iconComponent,
  isPassword = false,
  disabled = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const getBorderStyle = () => {
    if (error) return "border-red-500";
    if (isFocused) return "";
    return "border-gray-400 border-opacity-30";
  };

  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-medium mb-1">{label}</Text>}
      <View
        className={`flex-row border items-center rounded-xl p-3 ${getBorderStyle()}`}
        style={isFocused ? { borderColor: colors.primary.dark } : {}}
      >
        {icon && (
          <View className="mr-3 p-2 rounded-full" style={{ backgroundColor: colors.primary.dark }}>
            <Text className="text-white font-bold">{icon}</Text>
          </View>
        )}
        {iconComponent && <View className="mr-3">{iconComponent}</View>}
        <TextInput
          className="flex-1 text-base outline-none"
          style={{ color: colors.darkMode.text.dark }}
          placeholder={placeholder}
          placeholderTextColor={colors.darkMode.textSecondary.dark}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={toggleSecureEntry} className="p-2">
            <Text style={{ color: colors.primary.dark }}>{secureTextEntry ? "👁️" : "🔒"}</Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm ml-2 mt-1">{error}</Text>}
    </View>
  );
}
