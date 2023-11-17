import { Component, OnInit } from '@angular/core';
import { Course } from '../models/Course.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{
  courseName!: number;
  course: Course | undefined; // Ensure this model matches your Course data structure
  courseForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseName = Number(this.route.snapshot.params['id']);
    this.loadCourseDetails(this.courseName); // Pass courseName instead of course

    // Initialize courseForm
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      monthlyFee: ['', Validators.required]
      // Add more form controls as per your Course model
    });
  }

  loadCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (data: Course) => {
        this.course = data;
        this.courseForm.patchValue(this.course);
      },
      error => console.error('Error fetching course details:', error)
    );
  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      if (this.course?.id) { // Add null check here
        this.courseService.updateCourse(this.course.id, this.courseForm.value).subscribe(
          response => {
            console.log('Course updated successfully');
            this.router.navigate(['/courses']); // Update with your course list route
          },
          error => console.error('Error updating course:', error)
        );
      }
    } else {
      console.error('Form is not valid:', this.courseForm.errors);
    }
  }

  deleteCourse() {
    if (confirm('Are you sure you want to delete this course?')) {
    console.log("Attempting to delete course with ID:", this.course?.id);
    if (this.course) {
      this.courseService.deleteCourse(this.course.id).subscribe(
        response => {
          console.log("Course deleted successfully:", response);
          this.router.navigate(['/courses']);
        },
        error => {
          console.error('Error deleting course:', error);
          console.log('Request URL:', error.url);
          console.log('Status:', error.status);
          console.log('Status Text:', error.statusText);
        }
      );
    }
  }

}
}
