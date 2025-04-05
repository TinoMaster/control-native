export enum NoteStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface NoteModel {
  id: number;
  title: string;
  description: string;
  status: NoteStatus;
  createdBy: number;
  updatedBy: number;
  clientId: number;
  businessId: number;
  createdAt: Date;
  updatedAt: Date;
}
