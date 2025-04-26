import { zodResolver } from "@hookform/resolvers/zod";
import GenericInput from "components/forms/generic-input";
import { Resolver, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useDailyReportStore } from "store/dailyReport.store";
import { formatNumericInput } from "utilities/helpers/globals.helpers";
import { moneyDetailsSchema, MoneyDetailsSchemaOutput } from "./_schema/moneyDetails.schema";

// --- Main Component ---
export function MoneyDetails() {
  const setTotal = useDailyReportStore((state) => state.setTotal);
  const setFund = useDailyReportStore((state) => state.setFund);
  const report = useDailyReportStore((state) => state.report);

  const {
    formState: { errors },
    setValue,
    watch
  } = useForm<MoneyDetailsSchemaOutput>({
    resolver: zodResolver(moneyDetailsSchema) as Resolver<MoneyDetailsSchemaOutput>,
    defaultValues: {
      totalSales: report.total?.toString() ?? "",
      cashFund: report.fund?.toString() ?? ""
    },
    mode: "onBlur"
  });

  // Función reutilizable para validar y formatear valores numéricos
  const handleNumericInput = (text: string, fieldName: "totalSales" | "cashFund") => {
    // formatNumericInput es una función que valida y formatea los valores numéricos
    const formattedValue = formatNumericInput(text);
    setValue(fieldName, formattedValue, { shouldValidate: true });
    if (fieldName === "totalSales") {
      setTotal(Number(formattedValue));
    } else if (fieldName === "cashFund") {
      setFund(Number(formattedValue));
    }
  };

  return (
    <View className="mb-8">
      <Text className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Detalles Monetarios</Text>

      {/* Total Sales Input */}
      <View className="mb-4">
        <GenericInput
          label="Total de ventas"
          placeholder="Ingrese el total de ventas"
          keyboardType="decimal-pad"
          watch={watch("totalSales")}
          error={errors.totalSales}
          onChangeText={(text) => handleNumericInput(text, "totalSales")}
        />
      </View>
      {/* Cash Fund Input */}
      <View className="mb-4">
        <GenericInput
          label="Fondo dejado"
          placeholder="Ingrese el fondo dejado para cambio"
          keyboardType="decimal-pad"
          watch={watch("cashFund")}
          error={errors.cashFund}
          onChangeText={(text) => handleNumericInput(text, "cashFund")}
        />
      </View>
    </View>
  );
}

// Export the component with a named export as per rules
export default MoneyDetails; // Keep default for Expo Router file-based routing if needed, but prefer named generally.
// Let's adjust to prioritize named export based on rules, but acknowledge file-based routing might use default.
// The file-based routing in Expo Router uses the default export. So we keep it.
