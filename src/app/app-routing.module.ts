import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentComponent } from './students/students.component';
import { TeacherComponent } from './teachers/teachers.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'students', component: StudentComponent },
  { path: 'teachers', component: TeacherComponent },
  //{ path: 'add-course', component: AddCourseComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },  // Default route
  { path: 'teacher/:id', component: TeacherProfileComponent },  // Assuming you have a component named TeacherProfileComponent for individual teacher profiles
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: 'student-details/:id', component: StudentDetailsComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'group/add', component: GroupFormComponent },
  { path: 'group/edit/:id', component: GroupFormComponent },
  { path: '', redirectTo: '/groups', pathMatch: 'full' }  // Redirect to groups list as default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
