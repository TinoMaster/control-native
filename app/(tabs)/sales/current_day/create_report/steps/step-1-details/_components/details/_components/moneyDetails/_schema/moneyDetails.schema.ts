import { z } from "zod";

export const moneyDetailsSchema = z.object({
  totalSales: z
    .string()
    .min(0.01, "El total de ventas debe ser mayor a 0")
    .refine(
      (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
      "El total de ventas debe ser un número mayor a 0"
    ),
  cashFund: z
    .string()
    .min(0.01, "El fondo de efectivo debe ser mayor a 0")
    .refine(
      (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
      "El fondo de efectivo debe ser un número mayor a 0"
    )
});

// Infer the input and output types directly from the schema
export type MoneyDetailsSchemaOutput = z.output<typeof moneyDetailsSchema>;
