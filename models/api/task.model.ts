export enum ETaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: ETaskStatus;
  assignedToId: number;
  businessId: number;
  dateLimit: Date;
  createdAt: Date;
  updatedAt: Date;
}
