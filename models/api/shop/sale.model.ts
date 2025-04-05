import { DetailSaleModel } from './detailSale.model';

export enum PaymentMethodTypes {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
}

export interface SaleModel {
  id: number;
  clientId: number;
  userId: number;
  note: string;
  total: number;
  paid: number;
  debt: number;
  businessId: number;
  paymentMethod: PaymentMethodTypes;
  details: DetailSaleModel[];
  date: Date;
}
