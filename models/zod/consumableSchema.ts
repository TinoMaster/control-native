import { EUnit } from "models/unit.model";
import { z } from "zod";

export const consumableSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z
    .string()
    .min(0.01, "El precio debe ser mayor a 0")
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, "El precio debe ser un número mayor a 0"),
  unit: z.nativeEnum(EUnit, {
    errorMap: () => ({ message: "La unidad de medida es requerida" })
  }),
  stock: z
    .string()
    .min(0, "El stock es requerido")
    .refine(
      (value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0,
      "El stock debe ser un número mayor o igual a 0"
    )
});

export type ConsumableSchema = z.infer<typeof consumableSchema>;

export const consumableDefaultValues: ConsumableSchema = {
  name: "",
  description: "",
  price: "",
  unit: EUnit.PIECE,
  stock: ""
};
