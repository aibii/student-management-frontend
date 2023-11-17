import { Course } from "./Course.model";
import { Teacher } from "./Teacher.model";

export interface Group {
  id?: number;
  groupName: string;
  teacherId: number;
  description: string;
  courseId: number;
  startDate: Date; // or Date
  endDate: Date;   // or Date
}

