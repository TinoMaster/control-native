import { ERole } from "models/api";

/**
 * Formatea un número como moneda (EUR)
 * @param amount - Cantidad a formatear
 * @returns Cadena formateada como moneda
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const formatRole = (role: ERole): string => {
  return traslateRole(role);
};

const traslateRole = (role: ERole): string => {
  switch (role) {
    case ERole.ADMIN:
      return "Administrador";
    case ERole.USER:
      return "Usuario";
    case ERole.OWNER:
      return "Propietario";
    case ERole.EMPLOYEE:
      return "Empleado";
    case ERole.SUPERADMIN:
      return "Super Administrador";
    default:
      return "Usuario";
  }
};
