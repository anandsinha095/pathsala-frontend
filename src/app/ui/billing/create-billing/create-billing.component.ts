import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreateStudentService } from '../../../service/students/create-student.service';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-create-billing',
  templateUrl: './create-billing.component.html',
  styleUrls: ['./create-billing.component.scss']
})
export class CreateBillingComponent implements OnInit {
  studentForm !: FormGroup;
  submitted = false;
  billingList: any = ["Registration & Prospectus","Security Fee","Admission Fee", "Annual Fee", "Exam Fee", "Tuition Fee", "Computer Fee", "Transport Fee", "Dance Class Fee","Extra Activity Classes Fees", "Miscellaneous", "Arrears", "Fine"];
  constructor( private localData: CommonService,
    private router: Router, private activateRoute: ActivatedRoute,
    private service: CreateStudentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
  ) {}

  ngOnInit(){
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(2)]],
      alternetPhoneNumber: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      classId: ['', Validators.required],
      religion: ['', Validators.required],
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
