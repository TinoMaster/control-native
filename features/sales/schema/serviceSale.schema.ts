import { z } from "zod";

export const serviceSaleSchema = z.object({
  serviceId: z.number({
    required_error: "Debe seleccionar un servicio"
  }),
  employeeId: z.string({
    required_error: "Debe seleccionar un empleado"
  }),
  quantity: z.string().min(1, "La cantidad es requerida")
});

export type ServiceSaleSchema = z.infer<typeof serviceSaleSchema>;
