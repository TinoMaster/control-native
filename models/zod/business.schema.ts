import { z } from "zod";

export const registerBusinessSchema = z.object({
  businessName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  businessPhone: z.string().min(8, "Introduce un número de teléfono válido"),
  addressStreet: z.string().min(3, "Introduce una calle válida"),
  addressNumber: z.string().min(1, "Introduce un número válido"),
  addressMunicipality: z.string().min(3, "Introduce un municipio válido"),
  addressCity: z.string().min(3, "Introduce una ciudad válida"),
  addressZipCode: z.string().min(5, "Introduce un código postal válido"),
  businessDescription: z.string().min(3, "Introduce una descripción válida"),
});

export type RegisterBusinessDataModel = z.infer<typeof registerBusinessSchema>;

export const zBusinessDefaultValues: RegisterBusinessDataModel = {
  businessName: "",
  businessPhone: "",
  businessDescription: "",
  addressStreet: "",
  addressNumber: "",
  addressMunicipality: "",
  addressCity: "",
  addressZipCode: "",
};
