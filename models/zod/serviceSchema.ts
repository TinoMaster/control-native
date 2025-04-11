import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.string().min(1, "El precio debe ser mayor a 0").refine(
    (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
    "El precio debe ser un número mayor a 0"
  ),
  costs: z.array(
    z.object({
      consumable: z.object({
        id: z.number(),
        name: z.string(),
      }).optional(),
      quantity: z
        .string()
        .min(1, "La cantidad es requerida")
        .refine(
          (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
          "La cantidad debe ser un número mayor a 0"
        ),
    })
  ).optional(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const serviceDefaultValues: ServiceSchema = {
  name: "",
  description: "",
  price: "",
  costs: [],
};
