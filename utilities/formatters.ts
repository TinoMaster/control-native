import { isThisMonth, isThisWeek, isToday } from "date-fns";
import { ERole } from "models/api";
import { DebtModel } from "models/api/debt.model";

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

type SectionType = {
  title: string;
  data: DebtModel[];
};

export const organizeSectionedDebts = (debts: DebtModel[]): SectionType[] => {
  if (!debts || debts.length === 0) return [];

  const todayDebts: DebtModel[] = [];
  const thisWeekDebts: DebtModel[] = [];
  const thisMonthDebts: DebtModel[] = [];
  const olderDebts: DebtModel[] = [];

  debts.forEach((debt) => {
    const debtDate = debt.createdAt ? new Date(debt.createdAt) : new Date();

    if (isToday(debtDate)) {
      todayDebts.push(debt);
    } else if (isThisWeek(debtDate)) {
      thisWeekDebts.push(debt);
    } else if (isThisMonth(debtDate)) {
      thisMonthDebts.push(debt);
    } else {
      olderDebts.push(debt);
    }
  });

  const sections: SectionType[] = [];

  if (todayDebts.length > 0) {
    sections.push({ title: "Hoy", data: todayDebts });
  }

  if (thisWeekDebts.length > 0) {
    sections.push({ title: "Esta semana", data: thisWeekDebts });
  }

  if (thisMonthDebts.length > 0) {
    sections.push({ title: "Este mes", data: thisMonthDebts });
  }

  if (olderDebts.length > 0) {
    sections.push({ title: "Anteriores", data: olderDebts });
  }

  return sections;
};
