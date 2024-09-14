import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/Payment.model';
import { StudentService } from '../services/student.service';
import { ClassGroupService } from '../services/group.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})

export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  groupId!: number;
  studentId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      datePaid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.groupId = +this.route.snapshot.paramMap.get('groupId')!;
    this.studentId = +this.route.snapshot.paramMap.get('studentId')!;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData = {
        groupId: this.groupId,
        studentId: this.studentId,
        ...this.paymentForm.value
      };

      this.paymentService.createPayment(paymentData).subscribe(() => {
        this.router.navigate(['/payments']);  // Navigate back to payment list after successful submission
      });
    }
  }
}