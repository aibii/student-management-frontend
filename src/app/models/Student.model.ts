// student.model.ts

import { Group } from "./Group.model";

export class Student {
  studentId!: number;
  firstName!: string;
  lastName!: string;
  gender!: 'MALE' | 'FEMALE';
  school!: string;
  grade!: string;
  session!: 'MORNING' | 'AFTERNOON';
  dateOfBirth!: Date;
  address!: string;
  studentPhone!: string;
  parentPhone!: string;
  registrationDate!: Date;
  status!: 'active' | 'inactive';
}


