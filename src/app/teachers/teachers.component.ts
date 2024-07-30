import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data: Teacher[]) => {
        this.teachers = data;
      },
      error => {
        console.error('Error fetching teachers', error);
      }
    );
  }
}

