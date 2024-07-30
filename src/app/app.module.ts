import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // <-- Make sure you've imported this
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentComponent } from './students/students.component';
import { TeacherComponent } from './teachers/teachers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { CommonModule } from '@angular/common';
import { StudentService } from './services/student.service';
import { ClassGroupService } from './services/group.service';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    PaymentsComponent,
    StudentComponent,
    TeacherComponent,
    TeacherProfileComponent,
    CourseDetailsComponent,
    GroupListComponent,
    GroupFormComponent,
    StudentFormComponent,
    StudentDetailsComponent,
    GroupDetailsComponent,
    TeacherFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [StudentService, ClassGroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
