export interface DebtPaymentModel {
  id?: number;
  debtId: number;
  amount: number;
  employeeId: number;
  createdAt?: Date;
  comment?: string;
}
