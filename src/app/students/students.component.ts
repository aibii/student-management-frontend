import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from './../models/Student.model'; // Import the Student model
import { StudentService } from '../services/student.service'; // Import the Student service

@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  errorMessage: string = '';
  newStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    studentPhone: '',
    parentPhone: ''
  };

  viewStudentDetails(studentId: number): void {
    this.router.navigate(['/student-details', studentId]);
  }

  showAddStudentForm = false;
  sortColumn: string = ''; // 'name' or 'dob'
  sortDirection: 'asc' | 'desc' = 'asc'; // or 'desc'

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getAllStudents().subscribe(
      students => {
        this.students = students;
      },
      error => {
        this.errorMessage = 'Error fetching students';
        console.error(error);
      }
    );
  }

  toggleAddStudentForm() {
    this.showAddStudentForm = !this.showAddStudentForm;
  }

  addStudent(): void {
    if (this.newStudent.firstName && this.newStudent.lastName) {
      this.studentService.createStudent(this.newStudent).subscribe(
        (response: any) => { // Cast to any if you're unsure of the response structure
          const student = response as Student; // Cast the response to Student
          this.students.push(student);
          this.toggleAddStudentForm();
          this.newStudent = {
            id: 0,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            studentPhone: '',
            parentPhone: ''
            // ... reset additional properties ...
          };
        },
        error => {
          this.errorMessage = 'Error adding student';
          console.error('Error adding student:', error);
        }
      );
    } else {
      this.errorMessage = 'First name and last name are required.';
    }
  }
  

  sortData(column: keyof Student): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.students.sort(this.compareValues(column, this.sortDirection));
  }

  compareValues(key: keyof Student, order: 'asc' | 'desc' = 'asc') {
    return (a: Student, b: Student) => {
      if (!(key in a) || !(key in b)) {
        return 0;
      }
  
      let varA = a[key];
      let varB = b[key];
  
      // Adjust comparison for strings
      if (typeof varA === 'string' && typeof varB === 'string') {
        varA = varA.toUpperCase();
        varB = varB.toUpperCase();
      }
  
      // Adjust comparison for Dates
      if (varA instanceof Date && varB instanceof Date) {
        varA = varA.getTime();
        varB = varB.getTime();
      }
  
      // Adjust comparison for numbers (no transformation needed)
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
  
      return (order === 'desc' ? comparison * -1 : comparison);
    };
  }
  
  

  viewStudentProfile(studentId: number): void {
    // Assuming the route for a single student's profile is '/student/:id'
    this.router.navigate(['/student', studentId]);
  }
}

