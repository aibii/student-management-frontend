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

  addCourse() {
    this.showAddCourseForm = true;
}

saveCourse() {
  let courseData = this.courseForm.value;

  if (this.editingCourseId) {
    // Update an existing course
    this.courseService.updateCourse(this.editingCourseId, courseData).subscribe(
      updatedCourse => {
        // Update the course in your courses array
        // Hide the form, reset the editingCourseId, etc.
        // ...
      },
      error => console.error('Error updating course:', error)
    );
  } else {
    // Add a new course
    // Your existing code for adding a new course
    // ...
  }
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
  editCourse(course: any) {
    // Populate the courseForm with the course data to edit
    this.courseForm.setValue({
      courseName: course.courseName,
      description: course.description,
      startDate: course.startDate,
      endDate: course.endDate,
      monthlyFee: course.monthlyFee
      // add other fields as necessary
    });
    
    this.editingCourseId = course.id; // Keep track of the editing course's ID
    this.showAddCourseForm = true; // Show the form
  }
  
  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        console.log(`Course with id=${courseId} deleted`);
        this.courses = this.courses.filter(course => course.id !== courseId); // Remove the course from the array
      },
      error => console.error(`Error deleting course with id=${courseId}:`, error)
    );
  }
  
}


