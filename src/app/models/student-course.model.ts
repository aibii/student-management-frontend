export interface StudentCourse {
    id: number;
    studentId: number; // assuming you have studentId in the Student model
    courseId: number; // assuming you have courseId in the Course model
    description: string;
    joinedDate: string;
    status: string;
    courseName?: string; // if you're including course names from the server
    studentName?: string; // if you're including student names from the server
  }