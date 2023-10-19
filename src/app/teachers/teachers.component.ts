import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from './teacher.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  errorMessage: string = '';
  newTeacher: Teacher = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: ''
    // ... initialize other properties as needed ...
    ,
    id: 0
  };


  constructor(private teacherService: TeacherService, private router: Router) { }

  showAddTeacherForm = false;


  ngOnInit(): void {
    this.fetchTeachers();
  }


  fetchTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      data => {
        this.teachers = data;
      },
      error => {
        this.errorMessage = 'Error fetching teachers';
        console.error(error);
      }
    );
  }

  viewTeacherProfile(teacherId: number): void {
    // Assuming the route for a single teacher's profile is '/teacher/:id'
    this.router.navigate(['/teacher', teacherId]);
}

  toggleAddTeacherForm() {
    this.showAddTeacherForm = !this.showAddTeacherForm; // Toggle the form visibility.
  }

  addTeacher(): void {
    if (this.newTeacher.firstName && this.newTeacher.firstName.trim()) {
        this.teacherService.createTeacher(this.newTeacher).subscribe(
            (data: Teacher) => {
                console.log('Teacher added successfully!', data);
                this.teachers.push(data);
            },
            error => {
                console.error('Error adding teacher:', error);
            }
        );

        this.showAddTeacherForm = false;

        // Reset the newTeacher object for potential future use
        // Reset the newTeacher object for potential future use
      this.newTeacher = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: ''
        // ... add other required properties of Teacher here with default values ...
      };
    } else {
        console.warn('Teacher name is required.');
    }
}
}

