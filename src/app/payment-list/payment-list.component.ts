import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/Payment.model';
import { Router } from '@angular/router';
import { GroupStudentService } from '../services/group-student.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})

export class PaymentListComponent implements OnInit {
  groupsWithStudents: any[] = [];  // This will store the groups with students

  constructor(private groupStudentService: GroupStudentService) {}

  ngOnInit(): void {
    this.groupStudentService.getGroupsWithStudents().subscribe((data: any[]) => {
      this.groupsWithStudents = data;  // Ensure data is grouped by groupId
      
      // Log detailed information for each student for debugging
      this.groupsWithStudents.forEach(group => {
        console.log(`Group: ${group.groupName}, Teacher: ${group.teacherName}`);
        group.students.forEach((student: { studentFirstName: any; studentLastName: any; debt: any; remainingLessons: any; }) => {
          console.log(`Student: ${student.studentFirstName} ${student.studentLastName}, Debt: ${student.debt}, Remaining Lessons: ${student.remainingLessons}`);
        });
      });
    });
  }

  addPayment(groupId: number, studentId: number): void {
    console.log(`Adding payment for student ${studentId} in group ${groupId}`);
    // Implement navigation logic here, e.g., this.router.navigate(['/payment/add', groupId, studentId]);
  }

  calculateOverallDebt(payments: any[]): number {
    // Calculate the total debt based on the remaining payments for the student
    return payments.reduce((acc, payment) => acc + (payment.status === 'DUE' ? payment.amount : 0), 0);
  }

  getPaymentStatus(payment: any): string {
    if (payment.debt === 0) {
      return 'Paid';  // This should only show "Paid" if debt is zero and a payment has been made
    }
    if (payment.debt > 0 && payment.partialPayment) {
      return 'Partial';  // Handle partial payment case
    }
    return 'Due';  // If there's any debt, it should return "Due"
  }
}
