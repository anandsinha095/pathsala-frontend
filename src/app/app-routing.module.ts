import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { HomeComponent } from './ui/home/home.component';
import { StudentsComponent } from './ui/students/students/students.component';
import { CreateStudentComponent } from './ui/students/create-student/create-student.component';
import { StudentProfileComponent } from './ui/students/student-profile/student-profile.component';
import { BillingComponent } from './ui/billing/billing.component';
import { CreateBillingComponent } from './ui/billing/create-billing/create-billing.component';
import { ClassesComponent } from './ui/classes/classes.component';
import { CreateClassComponent } from './ui/classes/create-class/create-class.component';
import { EditClassComponent } from './ui/classes/edit-class/edit-class.component';

const routes: Routes = [
  { path:'login',component:LoginComponent },
  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  { path:'dashboard',component:HomeComponent},
  { path:'register',component:RegisterComponent},
  { path:'students',component:StudentsComponent},
  { path:'create-student',component:CreateStudentComponent},
  { path:'student-profile/:id',component:StudentProfileComponent},
  { path:'billing', component:BillingComponent},
  { path:'create-billing', component:CreateBillingComponent},
  { path:'classes', component:ClassesComponent},
  { path:'create-class', component:CreateClassComponent},
  { path:'edit-classes/:id', component:EditClassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
