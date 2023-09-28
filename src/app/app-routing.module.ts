import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentsComponent } from './students/students.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { TeacherComponent } from './teachers/teachers.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student-courses', component: StudentCoursesComponent },
  { path: 'teachers', component: TeacherComponent },
  //{ path: 'add-course', component: AddCourseComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
