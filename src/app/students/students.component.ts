import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student, Group } from '../models/Student.model';
import { StudentService } from '../services/student.service';

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

  groups: Group[] = [];
  selectedGroupId: number | null = null;
  selectedStudentId: number | null = null;

  viewStudentDetails(studentId: number): void {
    this.router.navigate(['/student-details', studentId]);
  }

  showAddStudentForm = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchGroups();
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

  fetchGroups(): void {
    this.groups = [
      { id: 1, groupName: 'Group 1' },
      { id: 2, groupName: 'Group 2' }
    ];
  }

  toggleAddStudentForm() {
    this.showAddStudentForm = !this.showAddStudentForm;
  }

  addStudent(): void {
    if (this.newStudent.firstName && this.newStudent.lastName) {
      this.studentService.createStudent(this.newStudent).subscribe(
        (response: any) => {
          const student = response as Student;
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
      let varA = a[key];
      let varB = b[key];

      // Handle undefined cases
      if (varA === undefined || varB === undefined) {
        return 0;
      }

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
    this.router.navigate(['/student', studentId]);
  }

  assignStudentToGroup(studentId: number | null): void {
    if (studentId !== null && this.selectedGroupId !== null) {
      this.studentService.assignStudentToGroup(studentId, this.selectedGroupId).subscribe(
        (updatedStudent: Object) => {
          const index = this.students.findIndex(student => student.id === studentId);
          if (index !== -1) {
            this.students[index] = updatedStudent as Student;
          }
        },
        error => {
          this.errorMessage = 'Error assigning student to group';
          console.error('Error assigning student to group:', error);
        }
      );
    } else {
      this.errorMessage = 'Please select a student and a group.';
    }
  }
}

