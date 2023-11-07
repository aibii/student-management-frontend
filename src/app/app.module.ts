import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // <-- Make sure you've imported this
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentComponent } from './students/students.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { TeacherComponent } from './teachers/teachers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { StudentDetailsComponent } from './student-details/student-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    PaymentsComponent,
    StudentComponent,
    StudentCoursesComponent,
    TeacherComponent,
    TeacherProfileComponent,
    CourseDetailsComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
