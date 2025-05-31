import { Feather, MaterialIcons } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface BusinessCardProps {
  readonly business: BusinessModel;
  readonly onApprove: (business: BusinessModel) => void;
  readonly onReject: (business: BusinessModel) => void;
  readonly isProcessing: boolean;
}

export const AuthBusinessCard = ({ business, onApprove, onReject, isProcessing }: BusinessCardProps) => {
  const defaultColors = useColors();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View
      style={[styles.card, { backgroundColor: adjustBrightness(defaultColors.background, 20) }]}
      className="mb-4 rounded-lg shadow-sm overflow-hidden"
      accessibilityRole="button"
      accessibilityLabel={`Negocio ${business.name}`}
    >
      <TouchableOpacity
        onPress={toggleExpand}
        className="flex-row justify-between items-center p-4"
        disabled={isProcessing}
      >
        <View className="flex-1">
          <Text
            className="text-lg font-bold mb-1"
            style={{ color: defaultColors.text }}
            numberOfLines={isExpanded ? undefined : 1}
          >
            {business.name}
          </Text>
          <Text
            className="text-sm mb-1"
            style={{ color: defaultColors.textSecondary }}
            numberOfLines={isExpanded ? undefined : 1}
          >
            {business.description}
          </Text>
          <Text className="text-sm" style={{ color: defaultColors.textSecondary }}>
            {business.phone}
          </Text>
        </View>
        <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={defaultColors.textSecondary} />
      </TouchableOpacity>

      {isExpanded && (
        <View className="px-4 pb-4">
          <View
            className="h-px w-full my-2"
            style={{ backgroundColor: adjustBrightness(defaultColors.background, -10) }}
          />

          <Text className="text-base font-semibold mb-2" style={{ color: defaultColors.text }}>
            Dirección
          </Text>
          <View className="mb-4">
            <Text style={{ color: defaultColors.textSecondary }}>
              {business.address.street} {business.address.number}
            </Text>
            <Text style={{ color: defaultColors.textSecondary }}>
              {business.address.municipality}, {business.address.city}, CP: {business.address.zip}
            </Text>
          </View>

          <View className="flex-row justify-end gap-3">
            <TouchableOpacity
              onPress={() => onReject(business)}
              className="flex-row items-center justify-center py-2 px-4 rounded-md"
              style={{ backgroundColor: colors.error.light }}
              disabled={isProcessing}
              accessibilityLabel="Rechazar negocio"
              accessibilityRole="button"
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <MaterialIcons name="cancel" size={18} color="white" style={{ marginRight: 4 }} />
                  <Text className="text-white font-medium">Rechazar</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onApprove(business)}
              className="flex-row items-center justify-center py-2 px-4 rounded-md"
              style={{ backgroundColor: colors.success.light }}
              disabled={isProcessing}
              accessibilityLabel="Aprobar negocio"
              accessibilityRole="button"
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <MaterialIcons name="check-circle" size={18} color="white" style={{ marginRight: 4 }} />
                  <Text className="text-white font-medium">Aprobar</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  }
});
