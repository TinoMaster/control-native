export interface DetailSaleModel {
  id: number;
  saleId: number;
  productId: number;
  serviceId: number;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}
