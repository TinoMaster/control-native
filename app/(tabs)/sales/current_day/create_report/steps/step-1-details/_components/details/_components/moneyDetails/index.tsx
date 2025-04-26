import { View, Text, TextInput } from "react-native";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for validation
// Use z.string() initially, transform and refine for numeric validation
const moneyDetailsSchema = z.object({
  totalSales: z
    .string()
    .transform((val) => val.replace(",", ".")) // Replace comma with dot
    .refine((val) => val === "" || !isNaN(parseFloat(val)), { message: "Debe ser un número" })
    .transform((val) => (val === "" ? undefined : parseFloat(val)))
    .refine((val) => val === undefined || val > 0, { message: "Debe ser positivo" })
    .optional(),
  cashFund: z
    .string()
    .transform((val) => val.replace(",", ".")) // Replace comma with dot
    .refine((val) => val === "" || !isNaN(parseFloat(val)), { message: "Debe ser un número" })
    .transform((val) => (val === "" ? undefined : parseFloat(val)))
    .refine((val) => val === undefined || val >= 0, { message: "No puede ser negativo" })
    .optional()
});

// Infer the input and output types directly from the schema
type MoneyDetailsSchemaOutput = z.output<typeof moneyDetailsSchema>;

// --- Main Component ---
export function MoneyDetails() {
  const {
    control,
    formState: { errors }
  } = useForm<MoneyDetailsSchemaOutput>({
    // Explicitly cast the resolver to match the form state type
    resolver: zodResolver(moneyDetailsSchema) as Resolver<MoneyDetailsSchemaOutput>,
    defaultValues: {
      // Default values match the OUTPUT type
      totalSales: undefined,
      cashFund: undefined
    },
    mode: "onBlur" // Let's add this
  });

  return (
    <View className="mb-8">
      <Text className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Detalles Monetarios</Text>

      {/* Total Sales Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Venta</Text>
        <Controller
          control={control}
          name="totalSales"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-md p-3 text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 ${
                errors.totalSales ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Ej: 150.75"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text: string) => onChange(text)} // Pass raw string, Zod handles conversion
              value={value !== undefined ? String(value) : ""}
              accessibilityLabel="Total de ventas del día"
            />
          )}
        />
        {errors.totalSales && <Text className="text-red-500 text-xs mt-1">{errors.totalSales.message}</Text>}
      </View>

      {/* Cash Fund Input */}
      <View>
        <Text className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Fondo para Cambio</Text>
        <Controller
          control={control}
          name="cashFund"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-md p-3 text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 ${
                errors.cashFund ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Ej: 50"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(text: string) => onChange(text)} // Pass raw string, Zod handles conversion
              value={value !== undefined ? String(value) : ""}
              accessibilityLabel="Dinero dejado como fondo para cambio"
            />
          )}
        />
        {errors.cashFund && <Text className="text-red-500 text-xs mt-1">{errors.cashFund.message}</Text>}
      </View>
    </View>
  );
}

// Export the component with a named export as per rules
export default MoneyDetails; // Keep default for Expo Router file-based routing if needed, but prefer named generally.
// Let's adjust to prioritize named export based on rules, but acknowledge file-based routing might use default.
// The file-based routing in Expo Router uses the default export. So we keep it.
