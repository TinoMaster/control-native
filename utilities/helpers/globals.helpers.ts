import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { GroupedSale } from "features/sales/components/SalesGroupByDay";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { EmployeeModel } from "models/api/employee.model";
import { MachineStateModel } from "models/api/machineState.model";

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

// Devolver el fondo total anterior de todas las maquinas seleccionadas
export const getTotalFundFromLastMachineState = (
  todayMachineStates: MachineStateModel[],
  lastMachineState: MachineStateModel[]
) => {
  const machinesToCompare = todayMachineStates.map((machineState) => machineState.machine.id);
  const lastMachineStateFiltered = lastMachineState.filter((machineState) =>
    machinesToCompare.includes(machineState.machine.id)
  );
  return lastMachineStateFiltered.reduce((acc, machineState) => acc + machineState.fund, 0);
};

/* Calcular la diferencia entre los fondos de las maquinas */
export const differenceBetweenFunds = (
  todayMachineStates: MachineStateModel[],
  lastMachineState: MachineStateModel[]
) => {
  const totalTodayFunds = todayMachineStates.reduce((acc, machineState) => acc + machineState.fund, 0);
  const totalLastFunds = getTotalFundFromLastMachineState(todayMachineStates, lastMachineState);

  if (totalLastFunds === 0) {
    return -totalTodayFunds;
  }

  return totalLastFunds - totalTodayFunds;
};

export function groupSalesByDay(sales: BusinessFinalSaleModelResponse[]): GroupedSale[] {
  // Create a map to group sales by date
  const groupedMap = sales.reduce((groups, sale) => {
    if (!sale.createdAt) return groups;

    // Extract just the date part (YYYY-MM-DD)
    let dateStr: string;

    // Handle createdAt as a Date object
    const date = sale.createdAt instanceof Date ? sale.createdAt : new Date(sale.createdAt as any);

    dateStr = format(date, "yyyy-MM-dd");

    if (!groups[dateStr]) {
      groups[dateStr] = {
        date: dateStr,
        formattedDate: format(parseISO(dateStr), "EEEE, d 'de' MMMM", { locale: es }),
        reports: [],
        totalAmount: 0
      };
    }

    groups[dateStr].reports.push(sale);
    groups[dateStr].totalAmount += sale.total ?? 0;

    return groups;
  }, {} as Record<string, GroupedSale>);

  // Convert map to array and sort by date (ascending)
  return Object.values(groupedMap).sort((a, b) => a.date.localeCompare(b.date));
}
