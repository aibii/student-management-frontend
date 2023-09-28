import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses: any;
  showAddCourseForm: boolean = false;
  courseForm!: FormGroup;
  teachers: string[] = ["Aizhan", "John", "Jane"];


  constructor(private courseService: CourseService, private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getCourses();
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
      teacherId: ['', Validators.required],
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

