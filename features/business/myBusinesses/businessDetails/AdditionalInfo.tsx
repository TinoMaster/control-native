import { MyCard } from "components/ui/cards/MyCard";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { Text } from "react-native";
import { formatDate } from "utilities/helpers/date.utils";

interface Props {
  readonly business: BusinessModel;
}

export function AdditionalInfo({ business }: Props) {
  const defaultColors = useColors();

  return (
    <MyCard title="Información Adicional" iconTitle="information-circle-outline">
      {business.createdAt && (
        <Text style={{ color: defaultColors.textSecondary }} className="text-base mb-2">
          Creado: {formatDate(new Date(business.createdAt))}
        </Text>
      )}
    </MyCard>
  );
}
