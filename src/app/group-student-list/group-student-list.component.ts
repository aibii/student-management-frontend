import { Component, OnInit } from '@angular/core';
import { GroupStudentService } from '../services/group-student.service';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.css']
})
export class GroupStudentListComponent implements OnInit {
  groupsWithStudents: any[] = [];  // This will store the groups with students

  constructor(private groupStudentService: GroupStudentService) {}

  ngOnInit(): void {
    // Fetch groups with students when the component loads
    this.groupStudentService.getGroupsWithStudents().subscribe((data: any[]) => {
      this.groupsWithStudents = data;
    });
  }

  addPayment(groupId: number, studentId: number): void {
    // Navigate to the payment form page to add a payment
    // You might use a router for navigation
    console.log(`Adding payment for student ${studentId} in group ${groupId}`);
    // Implement navigation logic here, e.g., this.router.navigate(['/payment/add', groupId, studentId]);
  }
}
