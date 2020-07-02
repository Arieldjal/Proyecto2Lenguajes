import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CourseListComponent,
    data: { title: 'Course List' }
  },
  {
    path: 'course-add',
    component: CourseAddComponent,
    data: { title: 'Course Add' }
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
    data: { title: 'Course Details' }
  },
  {
    path: 'course-update/:id',
    component: CourseUpdateComponent,
    data: { title: 'Student Update' }
  },
  
  { 
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseUpdateComponent,
    CourseDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
