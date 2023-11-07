// student.model.ts

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string; // Depending on how you handle dates
    address: string;
    studentPhone: string;
    parentPhone: string;
    // Include any other properties that a student would have
  }
  