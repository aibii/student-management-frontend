import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../teachers/teacher.model';
import { TeacherService } from '../services/teacher.service';
import { Course } from '../models/Course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses: Course[] = [];
  showAddCourseForm: boolean = false;
  courseForm!: FormGroup;
  teachers: Teacher[] = [];

  constructor(private courseService: CourseService, private router: Router,
    private fb: FormBuilder, private teacherService: TeacherService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fetchTeachers();
    this.getCourses();
  }

  fetchTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      data => {
        this.teachers = data;
      },
      error => {
        console.error('Error fetching teachers:', error);
      }
    );
}

toggleAddCourseForm() {
  this.showAddCourseForm = !this.showAddCourseForm; // Toggle the form visibility.
}

  getCourses(): void {
    this.courseService.getAllCourses()
      .subscribe(courses => this.courses = courses);
  }

  addCourse() {
    this.showAddCourseForm = true;
}

saveCourse(courseData: any) {
    this.courseService.addCourse(courseData).subscribe(newCourse => {
        this.courses.push(newCourse);
        this.showAddCourseForm = false;
    });
}

createForm() {
  this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      //teacherId: ['', Validators.required],
      monthlyFee: ['', Validators.required],
      // Add more fields as needed
  });
}

onSubmit() {
  if (this.courseForm.valid) {
      console.log("Saving course:", this.courseForm.value);
      this.courseService.addCourse(this.courseForm.value).subscribe(
        response => {
            console.log("Course saved successfully:", response);
        },
        error => {
            console.error("Error saving course:", error);
        }
    );
  } else {
      console.error("Form is not valid:", this.courseForm.errors);
  }
}
  // Implement methods for other CRUD operations here...
}

