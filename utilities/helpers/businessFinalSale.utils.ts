import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelResponse,
  CardPayment
} from "models/api/businessFinalSale.model";
import { CardModel } from "models/api/card.model";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";

export function calculateSalaryFromReport(report: BusinessFinalSaleModelResponse | BusinessFinalSaleModel): number {
  if (!report.fixedSalary && !report.percentSalary) return 0;

  const fixedSalary = report.fixedSalary ?? 0;
  const percentSalary = report.percentSalary ?? 0;
  const totalSales = report.total ?? 0;

  return fixedSalary + totalSales * percentSalary;
}

/**
 * Calcula los salarios de los empleados y devuelve un objeto con los nombres como claves y los salarios como valores
 * Esta es una versión simplificada que devuelve directamente el formato requerido por los componentes
 * @param employees Lista de empleados
 * @param totalSales Total de ventas (necesario para calcular salarios por porcentaje)
 * @returns Un objeto con los nombres de los empleados como claves y sus salarios como valores
 */
export function getWorkersAndSalaries(employees: EmployeeModel[], totalSales: number): Record<string, number> {
  const result: Record<string, number> = {};

  employees.forEach((employee) => {
    const hasFixedSalary = employee.fixedSalary > 0;
    const hasPercentSalary = employee.percentSalary > 0;

    let calculatedSalary = 0;

    // Calcular salario según configuración
    if (hasFixedSalary && hasPercentSalary) {
      calculatedSalary = employee.fixedSalary + totalSales * employee.percentSalary;
    } else if (hasPercentSalary) {
      calculatedSalary = totalSales * employee.percentSalary;
    } else {
      calculatedSalary = employee.fixedSalary;
    }

    // Agregar directamente al objeto resultado
    result[employee.user.name] = calculatedSalary;
  });

  return result;
}

export const getTotalCards = (cards: CardPayment[] | CardModel[]) => {
  return cards.reduce((acc, card) => acc + card.amount, 0);
};

export const getTotalDebts = (debts: DebtModel[]) => {
  return debts.reduce((acc, debt) => acc + debt.total, 0);
};

export const getTotalServices = (servicesSales: ServiceSaleModel[]) => {
  return servicesSales.reduce((acc, service) => acc + service.service.price * service.quantity, 0);
};

interface CalculateFinalCashParams {
  totalReport: number;
  totalCards: number;
  totalDebts: number;
  totalSalary: number;
  fundsDifference?: number;
}

export const calculateFinalCash = ({
  totalReport,
  totalCards,
  totalDebts,
  totalSalary,
  fundsDifference
}: CalculateFinalCashParams) => {
  const fundsDiff = fundsDifference ?? 0;
  return totalReport - (totalCards + totalDebts + totalSalary + fundsDiff);
};
