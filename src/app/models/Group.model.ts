import { Course } from "./Course.model";
import { Teacher } from "./Teacher.model";

export interface Group {
  id?: number;
  groupName: string;
  teacher: Teacher;
  description: string;
  course: Course;
  startDate: Date; // or Date
  endDate: Date;   // or Date
}

