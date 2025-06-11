import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api";
import React from "react";
import { StyleSheet, Text } from "react-native";

export const AdditionalInfo = ({ service }: { service: ServiceModel }) => {
  const defaultColors = useColors();

  return (
    <MyCard title="Información Adicional" iconTitle="information-circle-outline">
      {service.serviceKey?.createdAt && (
        <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
          Creado: {new Date(service.serviceKey.createdAt).toLocaleDateString()}
        </Text>
      )}
      {service.updatedAt && (
        <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
          Última actualización: {new Date(service.updatedAt).toLocaleDateString()}
        </Text>
      )}
    </MyCard>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 14,
    marginBottom: 8
  }
});
