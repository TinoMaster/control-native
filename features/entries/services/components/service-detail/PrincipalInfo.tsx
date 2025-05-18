import { MyCard } from "components/ui/MyCard";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api";
import { StyleSheet, Text } from "react-native";

export const PrincipalInfo = ({ service }: { service: ServiceModel }) => {
  const defaultColors = useColors();

  return (
    <MyCard header={false}>
      <Text style={[styles.serviceName, { color: defaultColors.text }]}>{service.name}</Text>
      <Text style={[styles.price, { color: defaultColors.primary }]}>${service.price.toFixed(2)}</Text>
      {Boolean(service.description) && (
        <Text style={[styles.description, { color: defaultColors.textSecondary }]}>{service.description}</Text>
      )}
    </MyCard>
  );
};

const styles = StyleSheet.create({
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 8
  },
  description: {
    fontSize: 16,
    lineHeight: 24
  }
});
