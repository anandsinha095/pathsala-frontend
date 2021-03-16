import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { HomeComponent } from './ui/home/home.component';
import { NavComponent } from './ui/nav/nav.component';
import { StudentsComponent } from './ui/students/students/students.component'
import { CreateStudentComponent } from './ui/students/create-student/create-student.component';
import { RegisterComponent } from './ui/register/register.component';
import { StudentProfileComponent } from './ui/students/student-profile/student-profile.component';
import { BillingComponent } from './ui/billing/billing.component';
import { CreateBillingComponent } from './ui/billing/create-billing/create-billing.component';
import { ClassesComponent } from './ui/classes/classes.component';
import { CreateClassComponent } from './ui/classes/create-class/create-class.component';
import { EditClassComponent } from './ui/classes/edit-class/edit-class.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    StudentsComponent,
    CreateStudentComponent,
    RegisterComponent,
    StudentProfileComponent,
    BillingComponent,
    CreateBillingComponent,
    ClassesComponent,
    CreateClassComponent,
    EditClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  schemas: [ NO_ERRORS_SCHEMA ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
