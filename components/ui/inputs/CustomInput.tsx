import useColors from "hooks/useColors";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import colors from "styles/colors";

interface CustomInputProps extends TextInputProps {
  readonly label?: string;
  readonly error?: string;
  readonly icon?: string;
  readonly iconComponent?: React.ReactNode;
  readonly isPassword?: boolean;
  readonly disabled?: boolean;
  readonly darkMode?: boolean;
  readonly whiteBackground?: boolean;
}

export function CustomInput({
  label,
  error,
  icon,
  iconComponent,
  isPassword = false,
  disabled = false,
  darkMode = false,
  whiteBackground = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const defaultColors = useColors();

  const handleFocus = () => setIsFocused(true);
  const handleEndEditing = () => setIsFocused(false);
  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const getBorderStyle = () => {
    if (error) return "border-red-500";
    if (isFocused) return "";
    return "border-gray-400 border-opacity-30";
  };

  const getPlaceHolderColor = () => {
    if (whiteBackground) return colors.lightMode.textSecondary.light;
    return darkMode ? colors.darkMode.textSecondary.dark : defaultColors.textSecondary;
  };

  const getTextColor = () => {
    if (whiteBackground) return colors.lightMode.text.dark;
    return darkMode ? colors.darkMode.text.dark : defaultColors.text;
  };

  return (
    <View className="mb-4">
      {label && (
        <Text style={{ color: defaultColors.text }} className="text-sm font-medium mb-1 ml-1">
          {label}
        </Text>
      )}
      <View
        className={`flex-row border items-center rounded-xl p-2 ${getBorderStyle()} ${
          whiteBackground ? "bg-white" : ""
        }`}
        style={isFocused ? { borderColor: defaultColors.primary } : {}}
      >
        {icon && (
          <View
            className="mr-3 p-2 rounded-full"
            style={{ backgroundColor: defaultColors.primary }}
          >
            <Text className="text-white font-bold">{icon}</Text>
          </View>
        )}
        {iconComponent && <View className="mr-3">{iconComponent}</View>}
        <TextInput
          className="flex-1 p-1 text-base outline-none"
          style={{
            color: getTextColor(),
            overflow: "hidden",
            width: "100%"
          }}
          placeholder={placeholder}
          placeholderTextColor={getPlaceHolderColor()}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onEndEditing={handleEndEditing}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={toggleSecureEntry} className="p-1">
            <Text style={{ color: getTextColor() }}>{secureTextEntry ? "👁️" : "🔒"}</Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs ml-2 mt-1">{error}</Text>}
    </View>
  );
}
