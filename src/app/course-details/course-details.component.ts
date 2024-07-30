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

export class CourseDetailsComponent implements OnInit {
  courseId!: number;
  course: Course | undefined; // Use Course type and allow undefined
  courseForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.params['id']);
    this.loadCourseDetails(this.courseId);

    // Initialize courseForm
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      monthlyFee: ['', Validators.required]
    });
  }

  loadCourseDetails(courseId: number): void { // Accept courseId as parameter
    this.courseService.getCourse(courseId).subscribe(
      (course: Course) => {
        this.course = course;
        // Patch form with course data
        this.courseForm.patchValue({
          courseName: course.courseName,
          description: course.description,
          startDate: course.startDate,
          endDate: course.endDate
        });
      },
      (error: any) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      if (this.course?.id) { // Use optional chaining to check for course.id
        this.courseService.updateCourse(this.course.id, this.courseForm.value).subscribe(
          response => {
            console.log('Course updated successfully');
            this.router.navigate(['/courses']); // Navigate to course list
          },
          error => console.error('Error updating course:', error)
        );
      }
    } else {
      console.error('Form is not valid:', this.courseForm.errors);
    }
  }

  deleteCourse(): void {
    if (confirm('Are you sure you want to delete this course?')) {
      console.log("Attempting to delete course with ID:", this.course?.id);
      if (this.course?.id) { // Ensure course and course.id are defined
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