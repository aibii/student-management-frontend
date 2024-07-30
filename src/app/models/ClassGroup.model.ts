import { Course } from "./Course.model";
import { Student } from "./Student.model";
import { Teacher } from "./Teacher.model";

export class ClassGroup {
  id!: number;
  groupName!: string;
  teacherId!: number; // Ensure this matches the backend schema
  courseId!: number;  // Ensure this matches the backend schema
  description?: string;
  startDate?: Date;
  endDate?: Date;
  monthlyFee!: number;
}
