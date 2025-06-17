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

export const formatPercentToNumber = (percent: number): number => {
  return percent * 100;
};

export const formatNumberToPercent = (number: number): number => {
  return number / 100;
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
