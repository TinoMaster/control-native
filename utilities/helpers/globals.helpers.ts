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
