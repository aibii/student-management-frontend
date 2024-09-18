import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { ClassGroupService } from '../services/group.service';
import { StudentGroupService } from '../services/student-group.service';
import { ClassGroup, StudentGroup, StudentGroupId} from '../models/StudentGroup.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;
  studentGroups: StudentGroup[] = [];
  allGroups: ClassGroup[] = [];
  selectedGroupId!: number;
  selectedStartDate!: string;
  nextAvailableLessonDate!: Date;

  constructor(
    private studentService: StudentService,
    private classGroupService: ClassGroupService,
    private studentGroupService: StudentGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudent();
    this.loadAllGroups();
    // Calculate the next available lesson date for the default
    this.calculateNextAvailableLesson();
  }

  calculateNextAvailableLesson(): void {
    // Logic to calculate next available lesson date based on the group’s schedule
    // This is a placeholder; you will need to customize it based on your backend data
    const today = new Date();
    const nextLessonDay = this.getNextLessonDate(today); // Implement this based on group schedule
    this.nextAvailableLessonDate = nextLessonDay;
    this.selectedStartDate = nextLessonDay.toISOString().substring(0, 10);  // Format as yyyy-MM-dd
  }

  getNextLessonDate(currentDate: Date): Date {
    // Placeholder: Customize this logic based on your group schedule
    // For example, if group meets Mon, Wed, Fri, find the next closest date
    const lessonDays = [1, 3, 5];  // Mon (1), Wed (3), Fri (5)
    let nextLessonDate = currentDate;
    while (!lessonDays.includes(nextLessonDate.getDay())) {
      nextLessonDate.setDate(nextLessonDate.getDate() + 1);
    }
    return nextLessonDate;
  }

  loadStudent() {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId !== null) {
      this.studentService.getStudent(+studentId).subscribe(data => {
        this.student = data;
        this.loadStudentGroups();
      }, error => {
        console.error('Error loading student data', error);
      });
    }
  }

  loadStudentGroups() {
    this.studentGroupService.getStudentGroups(this.student.studentId).subscribe((data: StudentGroup[]) => {
        this.studentGroups = data;
    }, error => {
        console.error('Error loading student groups', error);
    });
}


  loadAllGroups() {
    this.classGroupService.getGroups().subscribe(data => {
      this.allGroups = data;
    }, error => {
      console.error('Error loading all groups', error);
    });
  }

  assignToGroup(): void {
    console.log(`Assigning student to group ${this.selectedGroupId} starting on ${this.selectedStartDate}`);

    // Create a StudentGroupId object
    const studentGroupId = new StudentGroupId(this.student.studentId, this.selectedGroupId);

    // Create a StudentGroup object using the StudentGroupId and selected start date
    const studentGroup: StudentGroup = new StudentGroup(
      studentGroupId,                  // Pass the studentGroupId object
      this.selectedStartDate,           // Pass the selected start date from the form
      null                             // End date can be null or optional for now
    );

    // Pass the StudentGroup object to the service
    this.studentGroupService.assignStudentToGroup(studentGroup)
      .subscribe({
        next: response => {
          console.log('Student assigned successfully:', response);
          this.snackBar.open('Student assigned to group successfully!', 'Close', { duration: 3000 });  // Show the notification
        },
        error: err => {
          console.error('Error assigning student to group:', err);
          this.snackBar.open('Error assigning student to group.', 'Close', { duration: 3000 });  // Show error notification
        }
      });
  }


  removeFromGroup(groupId: number) {
    const studentGroupId = new StudentGroupId(this.student.studentId, groupId);
    this.studentGroupService.removeStudentFromGroup(studentGroupId).subscribe(() => {
      this.loadStudentGroups(); // Refresh the list of student groups
    }, error => {
      console.error('Error removing student from group', error);
    });
  }

  backToList() {
    this.router.navigate(['/students']);
  }

  editStudent() {
    this.router.navigate(['/students/edit', this.student.studentId]);
  }
}
