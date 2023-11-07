import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/Student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  errorMessage: string = '';
  successMessage: string | undefined;

  getStudentDetails(): void {
    // Extract the student ID from the route parameters and use it to load the student details
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(studentId).subscribe(
      (data: Student) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  saveStudentDetails(): void {
    if (this.student && this.student.id) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(
        () => {
          console.log('Update successful');
          setTimeout(() => this.router.navigate(['/students']), 500);
        },
        error => console.error('Error updating student:', error)
      );

    } else {
      console.error('Student ID is missing');
    }
  }

  deleteStudent() {
    if (this.student?.id) {
      // Confirm deletion
      if (confirm('Are you sure you want to delete this teacher?')) {
        this.studentService.deleteStudent(this.student.id).subscribe(
          () => {
            this.successMessage = 'Teacher deleted successfully.';
            // Navigate to teachers list with a delay so user can read message
            setTimeout(() => this.router.navigate(['/students']), 500);
          },
          error => {
            this.errorMessage = "Error deleting teacher.";
            // Log the error or handle it appropriately
            console.error('Error:', error);
          }
        );
      }
    } else {
      this.errorMessage = "Teacher ID not found.";
    }
  }
}
