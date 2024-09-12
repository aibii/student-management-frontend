import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { StudentComponent } from './students/students.component';
import { TeacherComponent } from './teachers/teachers.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'students', component: StudentComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/details/:id', component: StudentDetailsComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/new', component: GroupFormComponent },
  { path: 'groups/edit/:id', component: GroupFormComponent },
  { path: 'groups/details/:id', component: GroupDetailsComponent },
  { path: 'teachers', component: TeacherComponent },
  { path: 'teachers/edit/:id', component: TeacherFormComponent },
  { path: 'teachers/details/:id', component: TeacherProfileComponent }, // Assuming TeacherProfileComponent exists
  { path: 'courses/new', component: CourseFormComponent},
  { path: 'courses/edit/:id', component: CourseDetailsComponent }, // Assuming CourseDetailsComponent exists
  { path: '**', redirectTo: '/students' }  // Wildcard route for handling undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
