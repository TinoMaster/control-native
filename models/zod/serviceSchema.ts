import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.string().min(1, "El precio debe ser mayor a 0"),
  costs: z.array(
    z.object({
      consumable: z.object({
        id: z.number(),
        name: z.string(),
      }),
      quantity: z
        .string()
        .min(0.01, "La cantidad debe ser mayor a 0")
        .refine(
          (value) => parseInt(value) > -1,
          "La cantidad debe ser mayor a 0"
        ),
    })
  ),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const serviceDefaultValues: ServiceSchema = {
  name: "",
  description: "",
  price: "",
  costs: [{ consumable: { id: 0, name: "" }, quantity: "" }],
};
