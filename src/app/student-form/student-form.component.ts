import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  studentId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      school: [''],
      grade: [''],
      session: [''],
      address: [''],
      studentPhone: [''],
      parentPhone: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentId = +id;
        this.loadStudentData(this.studentId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadStudentData(id: number): void {
    this.studentService.getStudent(id).subscribe(student => {
      this.studentForm.patchValue(student);
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
  
    const student: Student = this.studentForm.value;
  
    if (this.isEditMode) {
      student.studentId = this.studentId;
      this.studentService.updateStudent(student).subscribe(
        () => {
          this.router.navigate(['/students']);
        },
        error => {
          console.error('Error updating student:', error);
        }
      );
    } else {
      this.studentService.createStudent(student).subscribe(
        () => {
          this.router.navigate(['/students']);
        },
        error => {
          console.error('Error creating student:', error);
        }
      );
    }
  }
  

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
