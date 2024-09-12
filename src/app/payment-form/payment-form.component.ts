import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/Payment.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})

export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  isEditMode: boolean = false;
  paymentId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      groupId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      datePaid: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.paymentId = +id;
        this.loadPaymentData(this.paymentId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadPaymentData(id: number): void {
    this.paymentService.getPayment(id).subscribe(payment => {
      this.paymentForm.patchValue(payment);
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    const payment: Payment = this.paymentForm.value;

    if (this.isEditMode) {
      payment.paymentId = this.paymentId;
      this.paymentService.updatePayment(this.paymentId, payment).subscribe(() => {
        this.router.navigate(['/payments']);
      });
    } else {
      this.paymentService.createPayment(payment).subscribe(() => {
        this.router.navigate(['/payments']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/payments']);
  }
}