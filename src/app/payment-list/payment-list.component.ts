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
 /* paymentsByStudent: { [studentId: number]: any[] } = {};

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe(data => {
      this.groupPaymentsByStudent(data);
    });
  }

  groupPaymentsByStudent(payments: any[]): void {
    this.paymentsByStudent = payments.reduce((acc, payment) => {
      const studentId = payment.studentId;
      if (!acc[studentId]) {
        acc[studentId] = [];
      }
      acc[studentId].push(payment);
      return acc;
    }, {});
  }

  calculateOverallDebt(payments: any[]): number {
    // Calculate overall debt for the student based on payments
    return payments.reduce((acc, payment) => acc + (payment.debt || 0), 0);
  }

  calculateRemainingLessons(payment: any): number {
    // Placeholder logic for calculating remaining lessons
    return payment.totalLessons - payment.lessonsAttended;
  }

  getPaymentStatus(payment: any): string {
    if (payment.debt === 0) return 'Paid';
    if (payment.debt > 0 && payment.partialPayment) return 'Partial';
    return 'Due';
  }

  getPaymentStatusClass(payment: any): string {
    if (payment.debt === 0) return 'table-success';
    if (payment.partialPayment) return 'table-warning';
    return 'table-danger';
  }*/

    groupsWithStudents: any[] = [];  // This will store the groups with students

  constructor(private groupStudentService: GroupStudentService) {}

  ngOnInit(): void {
    this.groupStudentService.getGroupsWithStudents().subscribe((data: any[]) => {
      this.groupsWithStudents = data;  // Ensure data is grouped by groupId
    });
  }

  addPayment(groupId: number, studentId: number): void {
    // Navigate to the payment form page to add a payment
    // You might use a router for navigation
    console.log(`Adding payment for student ${studentId} in group ${groupId}`);
    // Implement navigation logic here, e.g., this.router.navigate(['/payment/add', groupId, studentId]);
  }
}
