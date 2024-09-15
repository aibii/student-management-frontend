import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../models/Teacher.model';
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
  editingCourseId: number | null = null;

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


  saveCourse() {
    let courseData = this.courseForm.value;

    if (this.editingCourseId) {
          // Update an existing course
          this.courseService.updateCourse(this.editingCourseId, courseData).subscribe(
            (updatedCourse: Course) => { // Ensure that updatedCourse is of type Course
              const index = this.courses.findIndex(c => c.id === this.editingCourseId);
              if (index !== -1) {
                this.courses[index] = updatedCourse;
              }
          // Reset the form and editing state
          this.courseForm.reset();
          this.editingCourseId = null;
          // Hide the form or perform other UI updates as necessary
          // ...
        },
        error => console.error('Error updating course:', error)
      );
    } else {
      // Add a new course
      this.courseService.addCourse(courseData).subscribe(
        newCourse => {
          // Add the new course to your courses array
          this.courses.push(newCourse);

          // Reset the form
          this.courseForm.reset();
          // Update the UI as necessary to reflect the addition
          // ...
        },
        error => console.error('Error adding course:', error)
      );
    }
  }

createForm() {
  this.courseForm = this.fb.group({
    courseName: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: [''],
    monthlyFee: ['', Validators.required],
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

  addCourse() {
    this.router.navigate(['/courses/new']);  // Navigates to the course creation form
  }
  
  editCourse(course: Course) {
    this.router.navigate(['/courses/edit', course.id]);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(
        response => {
          console.log('Course deleted successfully');
          this.getCourses(); // Refresh the list after deletion
        },
        error => console.error('Error deleting course:', error)
      );
    }
  }
  
  }


