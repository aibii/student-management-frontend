import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/Payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  firstPayment: Payment | null = null;

  paymentsByStudent: { [studentId: number]: Payment[] } = {};

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.loadPaymentsGroupedByStudent();
  }

  loadPaymentsGroupedByStudent() {
    this.paymentService.getPayments().subscribe((data: Payment[]) => {
      this.paymentsByStudent = data.reduce((map, payment) => {
        // Use payment.student?.studentId as the key, checking for undefined values
        const studentId = payment.student?.studentId;
        if (studentId !== undefined) {
          if (!map[studentId]) {
            map[studentId] = [];
          }
          map[studentId].push(payment);
        }
        return map;
      }, {} as { [studentId: number]: Payment[] });
  
      // Set the first payment (if available)
      if (data.length > 0) {
        this.firstPayment = data[0];
      }
    });
  }

  editPayment(studentId: number, paymentId: number | undefined) {
    if (paymentId !== undefined) {
      console.log(paymentId);
      this.router.navigate(['/payments/edit', studentId, paymentId]);
    } else {
      console.error('Undefined paymentId');
    }
  }
  
  deletePayment(paymentId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this payment?');
    
    if (confirmed) {
      this.paymentService.deletePayment(paymentId).subscribe(() => {
        this.loadPaymentsGroupedByStudent();  // Reload the payments after deletion
      });
    }
  }
}
