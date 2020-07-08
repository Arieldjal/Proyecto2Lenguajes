import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorDetailsComponent } from './professor-details/professor-details.component';
import { ProfessorUpdateComponent } from './professor-update/professor-update.component';
import { ProfessorAddComponent } from './professor-add/professor-add.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CourseListComponent } from './course-list/course-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { StudentListComponent } from './student-list/student-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile'}
  },
  {
    path: 'student-registry',
    component: ProfessorListComponent,
    data: { title: 'Professor Registry'}
  },
  {
    path: 'professor-registry',
    component: ProfessorListComponent,
    data: { title: 'Professor Registry'}
  },
  {
    path: 'professor-add',
    component: ProfessorAddComponent,
    data: { title: 'Professor Add'}
  },
  {
    path: 'professor-details/:professor_id',
    component: ProfessorDetailsComponent,
    data: { title: 'Professor Details' }
  },
  {
    path: 'professor-update/:professor_id',
    component: ProfessorUpdateComponent,
    data: { title: 'Professor Update' }
  },
  {
    path: 'courses-registry',
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
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfessorListComponent,
    ProfessorDetailsComponent,
    ProfessorUpdateComponent,
    ProfessorAddComponent,
    NavBarComponent,
    HomeComponent,
    CourseListComponent,
    ProfileComponent,
    CourseDetailsComponent,
    CourseUpdateComponent,
    CourseAddComponent,
    StudentListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    GridModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }