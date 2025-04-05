export interface DebtModel {
    id?: number;
    name: string;
    description?: string;
    total: number;
    paid: number;
    createdAt?: Date;
    updatedAt?: Date;
}