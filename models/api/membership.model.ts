export interface MembershipModel {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  businessId: number;
  startAt: Date;
  endAt: Date;
}
