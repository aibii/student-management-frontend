import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { GroupService } from '../services/group.service';
import { Student } from '../models/Student.model';
import { Group } from '../models/Group.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  groups: Group[] = [];
  selectedStudent: Student | null = null;
  selectedGroupId: number | null = null;
  errorMessage: string | null = null;

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.loadStudents();
    this.loadGroups();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    }, (error: HttpErrorResponse) => { // Explicitly type the error parameter
      this.errorMessage = 'Failed to load students';
    });
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    }, (error: HttpErrorResponse) => { // Explicitly type the error parameter
      this.errorMessage = 'Failed to load groups';
    });
  }

  selectStudent(student: Student): void {
    this.selectedStudent = student;
    this.selectedGroupId = null; // Reset selected group
  }

  assignStudentToGroup(): void {
    if (this.selectedStudent && this.selectedGroupId !== null) {
      this.studentService.assignStudentToGroup(this.selectedStudent.id!, this.selectedGroupId).subscribe(() => {
        this.loadStudentDetails(this.selectedStudent!.id!);
      }, (error: HttpErrorResponse) => { // Explicitly type the error parameter
        this.errorMessage = 'Failed to assign student to group';
      });
    }
  }

  removeStudentFromGroup(groupId: number): void {
    if (this.selectedStudent) {
      this.studentService.removeStudentFromGroup(this.selectedStudent.id!, groupId).subscribe(() => {
        this.loadStudentDetails(this.selectedStudent!.id!);
      }, (error: HttpErrorResponse) => { // Explicitly type the error parameter
        this.errorMessage = 'Failed to remove student from group';
      });
    }
  }

  loadStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(data => {
      this.selectedStudent = data;
    }, (error: HttpErrorResponse) => { // Explicitly type the error parameter
      this.errorMessage = 'Failed to load student details';
    });
  }
}
