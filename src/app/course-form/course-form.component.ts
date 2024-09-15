import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})

export class CourseFormComponent implements OnInit {
  course: any = {};  // You may have a Course model instead

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we are editing an existing course
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourse(Number(courseId))  // Convert courseId to a number
        .subscribe(course => {
          this.course = course;
        });
    }
  }

  saveCourse() {
    if (this.course.id) {
      this.courseService.updateCourse(this.course.id, this.course).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.addCourse(this.course).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/courses']); // Navigate back to the course list
  }
}