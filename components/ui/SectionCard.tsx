import useColors from "hooks/useColors";
import { Text, View } from "react-native";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface SectionProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionProps) {
  const defaultColors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(defaultColors.background, 20) }}
      className="mb-4 p-4 rounded-lg shadow-sm"
    >
      <Text
        style={{ color: defaultColors.text }}
        className="text-lg font-semibold mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
