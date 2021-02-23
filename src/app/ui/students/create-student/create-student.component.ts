import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreateStudentService } from '../../../service/students/create-student.service';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  studentForm !: FormGroup;
  submitted = false;
  classes: any = [];
  constructor(   private router: Router, private activateRoute: ActivatedRoute,
    private service: CreateStudentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
    private localData: CommonService) {this.apiCall.getRequestHeader("classes/classList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.classes = res['data']
    }); }

    
  ngOnInit(){
     this.localData.checkLogin()
    this.studentForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        email: ['', [Validators.email, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(2)]],
        alternetPhoneNumber: ['', [Validators.maxLength(10), Validators.minLength(10)]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        classId: ['', Validators.required],
        fatherFirstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        fatherLastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        fatherOccupation: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        montherFirstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        montherLastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        motherOccupation: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
        city: ['', Validators.required],
        addressOne: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])*$'), Validators.maxLength(150), Validators.minLength(6)]],
        addressTwo: ['',[Validators.pattern('^([a-zA-Z0-9 _-])*$'), Validators.maxLength(150), Validators.minLength(6)]],
        zipcode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      })
    }
    async studentSubmit() {
      
      this.submitted = true;
      try {
         await this.service.signupApiCall(this.studentForm.value)
         return
      }
      catch (e) {
        this.toastr.error(e, "Oops!")
      }
    }

}
