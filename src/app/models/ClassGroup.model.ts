import { Course } from "./Course.model";
import { Student } from "./Student.model";
import { Teacher } from "./Teacher.model";

export class ClassGroup {
  id?: number;  // Mark as optional if not always provided
  groupName!: string;
  teacherId?: number;  // Optional if it can be null or undefined
  courseId?: number;   // Optional if it can be null or undefined
  description?: string;
  startDate?: Date;
  endDate?: Date;
  monthlyFee?: number; // Optional if not always provided
  teacherName?: string; 
  courseName?: string;
}

