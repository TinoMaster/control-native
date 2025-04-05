import { z } from "zod";

export const registerBusinessSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: z.string().min(8, "Introduce un número de teléfono válido"),
  addressStreet: z.string().min(3),
  addressNumber: z.string().min(1),
  addressMunicipality: z.string().min(3),
  addressCity: z.string().min(3),
  addressZipCode: z.string().min(5),
  description: z.string().min(3),
});

export type RegisterBusinessDataModel = z.infer<typeof registerBusinessSchema>;

export const zBusinessDefaultValues: RegisterBusinessDataModel = {
  name: "",
  phone: "",
  addressStreet: "",
  addressNumber: "",
  addressMunicipality: "",
  addressCity: "",
  addressZipCode: "",
  description: "",
};
