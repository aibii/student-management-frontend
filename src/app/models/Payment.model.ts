export class Payment {
  paymentId?: number;  // Optional because it's auto-generated
  student?: { studentId: number; firstName: string; lastName: string };
  classGroup?: { id: number; groupName: string };
  groupId!: number;
  amount!: number;
  datePaid!: Date;
  dueDate!: Date;
  status!: 'paid' | 'due' | 'overdue';
}
  