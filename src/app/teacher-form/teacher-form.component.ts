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
  teacher: any = {};  // You might replace this with a Teacher model

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');
    if (teacherId) {
      this.teacherService.getTeacher(Number(teacherId)).subscribe(teacher => {
        this.teacher = teacher;
      });
    }
  }

  saveTeacher() {
    if (this.teacher.id) {
      this.teacherService.updateTeacher(this.teacher.id, this.teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      });
    } else {
      this.teacherService.addTeacher(this.teacher).subscribe(() => {
        this.router.navigate(['/teachers']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/teachers']);
  }
}