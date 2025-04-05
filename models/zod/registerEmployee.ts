import { ERole } from "models/api";
import { z } from "zod";

export const registerEmployeeSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
    email: z.string().email("Introduce un correo válido"),
    dni: z.string().min(8, "Introduce un DNI válido"),
    role: z.nativeEnum(ERole, {
      errorMap: () => ({ message: "Selecciona un rol" }),
    }),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    phone: z.string().min(8, "Introduce un número de teléfono válido"),
    addressStreet: z.string().min(3),
    addressNumber: z.string().min(1),
    addressMunicipality: z.string().min(3),
    addressCity: z.string().min(3),
    addressZipCode: z.string().min(5),
    businesses: z.array(z.number()).min(1, "Selecciona al menos un negocio"),
    fixedSalary: z.string().optional(),
    percentSalary: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type TRegisterEmployeeDataModel = z.infer<typeof registerEmployeeSchema>;

export const zEmployeeDefaultValues: TRegisterEmployeeDataModel = {
  name: "",
  lastName: "",
  email: "",
  dni: "",
  password: "",
  confirmPassword: "",
  phone: "",
  addressStreet: "",
  addressNumber: "",
  addressMunicipality: "",
  addressCity: "",
  addressZipCode: "",
  role: ERole.EMPLOYEE,
  businesses: [],
  fixedSalary: "",
  percentSalary: "",
};
