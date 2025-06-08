import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Introduce un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const zLoginDefaultValues: TLoginSchema = {
  email: "",
  password: "",
};
