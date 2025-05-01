import { z } from "zod";

export const debtSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  total: z.string().min(1, "El total es requerido"),
  paid: z.string().min(1, "El monto pagado es requerido")
});

export type DebtFormValues = z.infer<typeof debtSchema>;
