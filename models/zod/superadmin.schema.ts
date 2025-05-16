import { z } from "zod";

export const createSuperAdminSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  email: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .max(100, "El correo no puede tener más de 100 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede tener más de 100 caracteres"),
});

export type TCreateSuperAdminSchema = z.infer<typeof createSuperAdminSchema>;

export const zCreateSuperAdminDefaultValues: TCreateSuperAdminSchema = {
  name: "",
  email: "",
  password: "",
};
