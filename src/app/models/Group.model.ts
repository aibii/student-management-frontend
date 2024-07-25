import { Course } from "./Course.model";
import { Student } from "./Student.model";
import { Teacher } from "./Teacher.model";

export interface Group {
  id: number; 
  groupName: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  teacher?: Teacher; // Define a Teacher interface
  students?: Student[]; 
  course?: Course;
}
