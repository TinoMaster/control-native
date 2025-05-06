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
