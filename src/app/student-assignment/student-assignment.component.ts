import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { GroupService } from '../services/group.service';
import { Student } from '../models/Student.model';
import { Group } from '../models/Group.model';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {

  students: Student[] = [];
  groups: Group[] = [];
  selectedStudentId: number | null = null;
  selectedGroupId: number | null = null;

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.loadStudents();
    this.loadGroups();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  assignStudentToGroup(): void {
    if (this.selectedStudentId !== null && this.selectedGroupId !== null) {
      this.studentService.assignStudentToGroup(this.selectedStudentId, this.selectedGroupId).subscribe(() => {
        alert('Student assigned to group successfully.');
        this.loadStudents();
      }, error => {
        alert('Failed to assign student to group.');
        console.error(error);
      });
    } else {
      alert('Please select both a student and a group.');
    }
  }
}

