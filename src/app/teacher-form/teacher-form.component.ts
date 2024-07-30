import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Teacher } from '../models/Teacher.model';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})

export class TeacherFormComponent implements OnInit {
  teacherForm!: FormGroup;
  isEditMode: boolean = false;
  teacherId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      dateOfBirth: [''],
      address: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Ensure this is a number
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.teacherId = +id;
        this.loadTeacherData(this.teacherId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadTeacherData(id: number): void {
    this.teacherService.getTeacher(id).subscribe(teacher => {
      this.teacherForm.patchValue(teacher);
    });
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      return;
    }
  
    const teacher: Teacher = this.teacherForm.value;
  
    if (this.isEditMode) {
      this.teacherService.updateTeacher(this.teacherId, teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      }, (error) => {
        console.error('Update error', error);
      });
    } else {
      this.teacherService.addTeacher(teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/teachers']);
  }
}