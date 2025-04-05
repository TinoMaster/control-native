export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: number;
  businessId: number;
  createdAt: Date;
  updatedAt: Date;
}
