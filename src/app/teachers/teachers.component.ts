import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from './teacher.model';

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
    dateOfBirth: '',  // initialize with an empty string or a default value
    address: '',
    phoneNumber: ''
    // ... initialize other properties as needed ...
};


  constructor(private teacherService: TeacherService) { }

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

