import { EmployeeModel } from "models/api/employee.model";

/**
 * Interfaz para representar el resultado del cálculo de salarios
 */
interface SalaryCalculationResult {
  /** Lista de empleados con sus salarios calculados */
  employees: Array<{
    /** Nombre del empleado */
    name: string;
    /** ID del empleado */
    id: string;
    /** Salario calculado */
    salary: number;
    /** Tipo de salario aplicado */
    salaryType: 'fixed' | 'percent' | 'both';
  }>;
  /** Suma total de todos los salarios */
  totalSalaries: number;
}

/**
 * Calcula los salarios de los empleados basados en sus configuraciones de salario
 * @param employees Lista de empleados
 * @param totalSales Total de ventas (necesario para calcular salarios por porcentaje)
 * @returns Objeto con la lista de empleados, sus salarios calculados y el total
 */
export function calculateEmployeeSalaries(
  employees: EmployeeModel[],
  totalSales: number
): SalaryCalculationResult {
  const result: SalaryCalculationResult = {
    employees: [],
    totalSalaries: 0
  };

  // Procesar cada empleado
  employees.forEach(employee => {
    const hasFixedSalary = employee.fixedSalary > 0;
    const hasPercentSalary = employee.percentSalary > 0;
    
    let calculatedSalary = 0;
    let salaryType: 'fixed' | 'percent' | 'both';
    
    // Calcular salario según configuración
    if (hasFixedSalary && hasPercentSalary) {
      // Si tiene ambos tipos de salario
      calculatedSalary = employee.fixedSalary + (totalSales * (employee.percentSalary / 100));
      salaryType = 'both';
    } else if (hasPercentSalary) {
      // Si solo tiene salario por porcentaje
      calculatedSalary = totalSales * (employee.percentSalary / 100);
      salaryType = 'percent';
    } else {
      // Si solo tiene salario fijo o no tiene ninguno configurado
      calculatedSalary = employee.fixedSalary;
      salaryType = 'fixed';
    }
    
    // Agregar al resultado
    result.employees.push({
      name: employee.user.name,
      id: employee.id,
      salary: calculatedSalary,
      salaryType
    });
    
    // Sumar al total
    result.totalSalaries += calculatedSalary;
  });

  return result;
}
