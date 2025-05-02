import { EmployeeModel } from "models/api/employee.model";

export const formatNumericInput = (text: string) => {
  // Solo permitir números y un punto decimal
  const numericValue = text.replace(/[^0-9.]/g, "");
  // Evitar múltiples puntos decimales
  const parts = numericValue.split(".");
  const formattedValue = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : numericValue;
  return formattedValue;
};

export const filterEmployeesReadyToWork = (employees: EmployeeModel[]): EmployeeModel[] => {
  return employees.filter((e) => {
    return e.user.active && (e.percentSalary > 0 || e.fixedSalary > 0);
  });
};

export function adjustBrightness(color: string, percent: number): string {
  // Convertir hex a rgb
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Ajustar brillo
  const adjustedR = Math.min(255, Math.max(0, r + (r * percent) / 100));
  const adjustedG = Math.min(255, Math.max(0, g + (g * percent) / 100));
  const adjustedB = Math.min(255, Math.max(0, b + (b * percent) / 100));

  // Convertir de vuelta a hex
  return `#${Math.round(adjustedR).toString(16).padStart(2, "0")}${Math.round(adjustedG)
    .toString(16)
    .padStart(2, "0")}${Math.round(adjustedB).toString(16).padStart(2, "0")}`;
}
