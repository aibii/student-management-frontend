import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { ClassGroupService } from '../services/group.service';
import { StudentGroupService } from '../services/student-group.service';
import { ClassGroup, StudentGroup, StudentGroupId} from '../models/StudentGroup.model';

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

  constructor(
    private studentService: StudentService,
    private classGroupService: ClassGroupService,
    private studentGroupService: StudentGroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudent();
    this.loadAllGroups();
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

  assignToGroup() {
    const studentGroupId = new StudentGroupId(this.student.studentId, this.selectedGroupId);

    const studentGroup: StudentGroup = new StudentGroup(
      studentGroupId,
      new Date(),  // Ensure the date format matches the backend expectations
      null,  // Or a specific end date if needed
      this.allGroups.find(group => group.id === this.selectedGroupId)  // Optional, include if needed
    );

    console.log("Sending StudentGroup:", studentGroup);  // Debugging line to verify the data

    this.studentGroupService.assignStudentToGroup(studentGroup).subscribe(() => {
      this.loadStudentGroups();  // Refresh the list of student groups
    }, error => {
      console.error('Error assigning student to group', error);
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
