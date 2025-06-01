import { z } from "zod";

export const serviceSaleSchema = z.object({
  serviceId: z.string().min(1, "Debe seleccionar un servicio"),
  employeeId: z.string().min(1, "Debe seleccionar un empleado"),
  quantity: z.string().min(1, "La cantidad es requerida")
});

export type ServiceSaleSchema = z.infer<typeof serviceSaleSchema>;
