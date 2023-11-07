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
    leader: ''
  };

  submitGroup(form: NgForm) {
    if (form.valid) {
      this.groupService.createStudentCourse(this.newGroup).subscribe({
        next: (response) => {
          // Handle the response, maybe clear the form or give user feedback
          console.log('Group created:', response);
  
          // Update the studentCourses array with the new group
          this.studentCourses.push(response);
  
          this.showAddGroupForm = false; // Hide the form upon successful save
          form.reset(); // Reset the form if needed
        },
        error: (error) => {
          // Handle any errors here
          console.error('There was an error creating the group:', error);
        }
      });
    }
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



