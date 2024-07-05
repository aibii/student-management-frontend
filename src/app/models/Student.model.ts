// student.model.ts

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  studentPhone: string;
  parentPhone: string;
  groups?: Group[]; // Add groups property
}

export interface Group {
  id: number;
  groupName: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
