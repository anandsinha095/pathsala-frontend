import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { HomeComponent } from './ui/home/home.component';
import { StudentsComponent } from './ui/students/students/students.component';
import { CreateStudentComponent } from './ui/students/create-student/create-student.component';
import { StudentProfileComponent } from './ui/students/student-profile/student-profile.component';

const routes: Routes = [
  { path:'login',component:LoginComponent },
  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  { path:'dashboard',component:HomeComponent},
  { path:'register',component:RegisterComponent},
  { path:'students',component:StudentsComponent},
  { path:'create-student',component:CreateStudentComponent},
  { path:'student-profile/:id',component:StudentProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
