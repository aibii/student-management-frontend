import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { GroupService } from '../services/group.service';
import { Student } from '../models/Student.model';
import { Group } from '../models/Group.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addStudent() {
    this.router.navigate(['/students/new']);
  }

  editStudent(student: Student) {
    this.router.navigate(['/students/edit', student.studentId]);
  }

  deleteStudent(studentId: number | undefined) {
    if (studentId === undefined) {
      console.error('Cannot delete student: studentId is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe(() => {
        this.loadStudents(); // Reload students after deletion
      });
    }
  }
}
