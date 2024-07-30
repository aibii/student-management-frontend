export interface Course {
    id: number;
    courseName: string;   // Note the naming
    description: string; // `?` indicates this field is optional
    startDate: string;
    endDate: string;
    //teacher: any;     // PLACEHOLDER Assuming you have a Teacher interface in TypeScript
}
