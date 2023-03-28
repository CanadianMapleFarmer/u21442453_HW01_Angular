import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './course/courses.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'editCourse/:id', component: EditCourseComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
