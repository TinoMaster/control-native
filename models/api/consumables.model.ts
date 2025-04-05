export interface ConsumableModel {
    id?: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    stock: number;
    business: number;
    createdAt?: Date;
    updatedAt?: Date;
}