import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { moneyDetailsSchema, MoneyDetailsSchemaOutput } from "features/sales/current_day/schema/moneyDetails.schema";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { Controller, Resolver, useForm } from "react-hook-form";
import { View } from "react-native";
import { formatNumericInput } from "utilities/helpers/globals.helpers";

export function MoneyDetails() {
  const setTotal = useDailyReportStore((state) => state.setTotal);
  const report = useDailyReportStore((state) => state.report);

  const {
    formState: { errors },
    control,
    setValue
  } = useForm<MoneyDetailsSchemaOutput>({
    resolver: zodResolver(moneyDetailsSchema) as Resolver<MoneyDetailsSchemaOutput>,
    defaultValues: {
      totalSales: report.total?.toString() ?? ""
    },
    mode: "onBlur"
  });

  const handleNumericInput = (text: string, fieldName: "totalSales") => {
    const formattedValue = formatNumericInput(text);
    setValue(fieldName, formattedValue, { shouldValidate: true });
    setTotal(Number(formattedValue));
  };

  return (
    <View>
      <Controller
        control={control}
        name="totalSales"
        render={({ field: { value } }) => (
          <CustomInput
            label="Total de venta"
            placeholder="Ingrese el total de venta"
            keyboardType="decimal-pad"
            whiteBackground
            value={value}
            error={errors.totalSales?.message}
            onChangeText={(text) => handleNumericInput(text, "totalSales")}
          />
        )}
      />
    </View>
  );
}
