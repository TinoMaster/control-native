import { z } from "zod";

// Schema para validación de tarjetas
export const cardSchema = z.object({
  cardType: z.string().min(1, "El tipo de tarjeta es requerido"),
  cardNumber: z.string().min(4, "El número de tarjeta debe tener al menos 4 dígitos"),
  amount: z.string().min(1, "El monto es requerido"),
  reference: z.string().optional()
});

export type CardFormValues = z.infer<typeof cardSchema>;
