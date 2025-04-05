import { MembershipModel } from '@app/core/models/membership.model';

export interface ClientModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  membership: MembershipModel | null;
  businessId: number;
  createdAt: Date;
  updatedAt: Date;
}
