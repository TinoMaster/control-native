import { z } from "zod";

export const debtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  total: z.number().min(0.01, "El total debe ser mayor a 0"),
  paid: z.number().min(0, "El pago no puede ser negativo")
});

export type DebtFormData = z.infer<typeof debtSchema>;
