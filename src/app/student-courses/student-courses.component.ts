import { Component, OnInit } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  studentCourses: any;

  constructor(private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.getStudentCourses();
  }

  getStudentCourses(): void {
    this.studentCourseService.getAllStudentCourses()
      .subscribe(studentCourses => this.studentCourses = studentCourses);
  }

  // Implement methods for other CRUD operations here...
}

