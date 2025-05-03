import { zodResolver } from "@hookform/resolvers/zod";
import GenericInput from "components/forms/generic-input";
import { moneyDetailsSchema, MoneyDetailsSchemaOutput } from "features/sales/schema/moneyDetails.schema";
import useColors from "hooks/useColors";
import { Resolver, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

// --- Main Component ---
export function MoneyDetails() {
  const setTotal = useDailyReportStore((state) => state.setTotal);
  const report = useDailyReportStore((state) => state.report);
  const defaultColors = useColors();

  const {
    formState: { errors },
    setValue,
    watch
  } = useForm<MoneyDetailsSchemaOutput>({
    resolver: zodResolver(moneyDetailsSchema) as Resolver<MoneyDetailsSchemaOutput>,
    defaultValues: {
      totalSales: report.total?.toString() ?? ""
    },
    mode: "onBlur"
  });

  // Función reutilizable para validar y formatear valores numéricos
  const handleNumericInput = (text: string, fieldName: "totalSales") => {
    // formatNumericInput es una función que valida y formatea los valores numéricos
    const formattedValue = formatNumericInput(text);
    setValue(fieldName, formattedValue, { shouldValidate: true });
    if (fieldName === "totalSales") {
      setTotal(Number(formattedValue));
    }
  };

  return (
    <View style={{ gap: 16 }} className="flex-1">
      <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
        Detalles Monetarios
      </Text>

      {/* Total Sales Input */}
      <View>
        <GenericInput
          label="Total de venta"
          placeholder="Ingrese el total de venta"
          keyboardType="decimal-pad"
          watch={watch("totalSales")}
          error={errors.totalSales}
          onChangeText={(text) => handleNumericInput(text, "totalSales")}
        />
      </View>
    </View>
  );
}
