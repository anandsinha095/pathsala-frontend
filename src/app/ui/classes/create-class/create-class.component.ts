import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreateStudentService } from '../../../service/students/create-student.service';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {
  classForm !: FormGroup;
  submitted = false;
  billingList: any = ["Registration & Prospectus","Security Fee","Admission Fee", "Annual Fee", "Exam Fee", "Tuition Fee", "Computer Fee", "Transport Fee", "Dance Class Fee","Extra Activity Classes Fees", "Miscellaneous", "Arrears", "Fine"];
  constructor( private router: Router, private activateRoute: ActivatedRoute,
    private service: CreateStudentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
    private localData: CommonService) { }

  ngOnInit(){
    this.localData.checkLogin()
    this.classForm = this.formBuilder.group({
       name: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       seats: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       registration: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       security:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       admission:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       annual:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       exam:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       tuition:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       computer:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       transport:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       dance:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       miscellaneous:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
       extraActivityClasses:  ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'), Validators.maxLength(12), Validators.minLength(2)]],
    })
  }
  async classSubmit() {
    this.submitted = true;
    try {
       //await this.service.signupApiCall(this..value)
       return
    }
    catch (e) {
      this.toastr.error(e, "Oops!")
    }
  }

}
