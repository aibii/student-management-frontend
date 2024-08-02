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
  course: Course | undefined;
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

    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  loadCourseDetails(courseId: number): void {
    this.courseService.getCourse(courseId).subscribe(
      (course: Course) => {
        this.course = course;
        if (course) {
          this.courseForm.patchValue({
            courseName: course.courseName,
            description: course.description,
            startDate: course.startDate,
            endDate: course.endDate
          });
        }
      },
      (error: any) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  saveCourse(): void {
    if (this.courseForm.valid && this.course) {
      this.courseService.updateCourse(this.course.id, this.courseForm.value).subscribe(
        response => {
          console.log('Course updated successfully');
          this.router.navigate(['/courses']);
        },
        error => console.error('Error updating course:', error)
      );
    } else {
      console.error('Form is not valid or course is undefined:', this.courseForm.errors);
    }
  }
  
  deleteCourse(): void {
    if (this.course && confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(this.course.id).subscribe(
        response => {
          console.log('Course deleted successfully');
          this.router.navigate(['/courses']);
        },
        error => {
          console.error('Error deleting course:', error);
          if (error.status === 409) {
            alert('Cannot delete course. Please delete associated groups first.');
          } else {
            alert('An error occurred while trying to delete the course.');
          }
        }
      );
    }
  }
}