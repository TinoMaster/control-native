import { z } from "zod";

export const registerOwnerSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
    phone: z.string().min(8, "El número de teléfono debe tener al menos 8 caracteres"),
    email: z.string().email("Introduce un correo válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    businessName: z.string().min(3, "El nombre de la empresa debe tener al menos 3 caracteres"),
    businessPhone: z.string().min(8),
    businessDescription: z.string().min(3),
    addressStreet: z.string().min(3),
    addressNumber: z.string().min(1),
    addressMunicipality: z.string().min(3),
    addressCity: z.string().min(3),
    addressZipCode: z.string().min(5)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
  });

export type TRegisterOwnerDataModel = z.infer<typeof registerOwnerSchema>;

export const zRegisterDefaultValues: TRegisterOwnerDataModel = {
  name: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  businessName: "",
  businessPhone: "",
  addressMunicipality: "",
  businessDescription: "",
  addressStreet: "",
  addressNumber: "",
  addressCity: "",
  addressZipCode: ""
};
