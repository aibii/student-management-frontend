export class StudentGroupId {
    studentId: number;
    groupId: number;
  
    constructor(studentId: number, groupId: number) {
      this.studentId = studentId;
      this.groupId = groupId;
    }
  }
  
  export class StudentGroup {
    id: StudentGroupId;
    startDate: String;
    endDate: Date | null;
    classGroup?: ClassGroup;  // Optional property, assuming ClassGroup is another model
    

    constructor(id: StudentGroupId, startDate: String, endDate: Date | null = null, classGroup?: ClassGroup) {
      this.id = id;
      this.startDate = startDate;
      this.endDate = endDate;
      this.classGroup = classGroup;
    }
  }
  
  export class ClassGroup {
    id?: number;  // Optional if not always required
    groupName!: string;
    teacherId?: number;  // Optional if it can be null or undefined
    courseId?: number;   // Optional if it can be null or undefined
    description?: string;
    startDate?: Date;
    endDate?: Date;
    monthlyFee?: number;  // Optional if not always provided
    teacherName?: string; 
    courseName?: string;
    schedule?: string;
  
    constructor(
      groupName: string,
      id?: number,
      teacherId?: number,
      courseId?: number,
      description?: string,
      startDate?: Date,
      endDate?: Date,
      monthlyFee?: number,
      teacherName?: string,
      courseName?: string,
      schedule?: string
    ) {
      this.id = id;
      this.groupName = groupName;
      this.teacherId = teacherId;
      this.courseId = courseId;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.monthlyFee = monthlyFee;
      this.teacherName = teacherName;
      this.courseName = courseName;
      this.schedule = schedule;
    }
  }