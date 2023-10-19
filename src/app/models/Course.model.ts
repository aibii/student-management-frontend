export interface Course {
    id: number;
    courseName: string;   // Note the naming
    description?: string; // `?` indicates this field is optional
    startDate: Date;
    endDate?: Date;       // `?` indicates this field is optional
    monthlyFee: number;   // Since BigDecimal usually translates to a number in JavaScript/TypeScript
    //teacher: any;     // PLACEHOLDER Assuming you have a Teacher interface in TypeScript
    studentCourses?: any[];  // PLACEHOLDER Assuming you have a StudentCourse interface, and it's optional
}
