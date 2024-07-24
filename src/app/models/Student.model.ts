// student.model.ts

import { Group } from "./Group.model";


export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  gender?: 'MALE' | 'FEMALE'; // or use a string if the API returns string values
  school?: string;
  grade?: string;
  session?: 'MORNING' | 'AFTERNOON'; // or string if your API returns string values
  dateOfBirth?: string; // Assuming dates are in ISO string format from the API
  address?: string;
  studentPhone?: string;
  parentPhone?: string;
  registrationDate?: string; // ISO string format, ensure consistency with backend
  status?: string;
  groups?: Group[];
}


