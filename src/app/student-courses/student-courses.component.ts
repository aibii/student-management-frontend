import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service';
import { Teacher } from './../models/Teacher.model'; // Import the interface
import { Course } from './../models/Course.model'; // Import the interface
import { NgForm } from '@angular/forms';
import { StudentCourseService } from './../services/student-course.service';



@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: any[] = []; // 'any' type here, adjust if you have a specific type
  teachers: Teacher[] = []; // Use the Teacher interface to type the array
  courses: Course[] = []; // Use the Course interface to type the array
  
  constructor(private groupService: StudentCourseService, private router: Router,
              private teacherService: TeacherService, private courseService: CourseService) {}
  subjects = []; // Should be populated with data from your service

  showAddGroupForm: boolean = false;
  newGroup: any = {
    groupName: '',
    description: '',
    teacherId: null,  // Initialize as number
    courseId: null,   // Initialize as number
    startDate: '',
    endDate: '',
  };

  submitGroup(form: NgForm) {
  const startDate = new Date(this.newGroup.startDate);
  const endDate = new Date(this.newGroup.endDate);
  
  if (this.newGroup.startDate > this.newGroup.endDate) {
    console.error('End date must be after start date');
    // Display an error message to the user
    return;
  }
  if (!form.valid) {
    console.log('Form is invalid');
    // Optionally, display user-friendly messages or highlight invalid fields here
    return;
  }

  this.newGroup.teacherId = Number(this.newGroup.teacherId);
  this.newGroup.courseId = Number(this.newGroup.courseId);

  // Validation for additional fields like dates and IDs
  if (!this.newGroup.teacherId || !this.newGroup.courseId) {
    console.error('Missing required fields');
    // Display an error message to the user
    return;
  }

  // Additional formatting or checks can be performed here

  this.sendGroupData(form);
}

sendGroupData(form: NgForm) {
  this.groupService.createStudentCourse(this.newGroup).subscribe({
    next: (response) => this.handleSuccess(response, form),
    error: (error) => this.handleError(error)
  });
}

  handleError(error: any) {
    console.error('There was an error creating the group:', error);
    // Display an error message to the user here
  }

  handleSuccess(response: any, form: NgForm) {
    console.log('Group created:', response);
    this.studentCourses.push(response); // Update your list
    this.showAddGroupForm = false; // Hide the form
    form.reset(); // Reset the form
    // Optionally, display a success message to the user
  }
  
  ngOnInit(): void {
    this.loadAllStudentCourses();
    this.populateTeachers();
    this.populateSubjects();
  }

  populateTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      data => {
        this.teachers = data;
      },
      error => {
        console.error('Error fetching teachers', error);
      }
    );
  }

  populateSubjects() {
    this.courseService.getAllCourses().subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching subjects', error);
      }
    );
  }

  showAddCourseForm(): void {
    this.router.navigate(['/add-student-course']);
  }

  loadAllStudentCourses(): void {
    this.groupService.getAllStudentCourses()
      .subscribe(
        data => this.studentCourses = data,
        error => console.error('There was an error retrieving student courses', error)
      );
  }
}



