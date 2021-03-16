import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClassesService } from '../../../service/classes/classes.service';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  classes:any;
  classForm !: FormGroup;
  submitted = false;
  billingList: any = ["Registration & Prospectus","Security Fee","Admission Fee", "Annual Fee", "Exam Fee", "Tuition Fee", "Computer Fee", "Transport Fee", "Dance Class Fee","Extra Activity Classes Fees", "Miscellaneous", "Arrears", "Fine"];
  constructor( 
    private router: Router, 
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private service : ClassesService,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
    private localData: CommonService) { }

  ngOnInit(){
      this.localData.checkLogin()
      let id= this.route.snapshot.paramMap.get('id');
      this.apiCall.getRequestHeader("classes/classInfo/"+id, this.localData.getlocalData()['token']).subscribe((res:any) => {
        this.classes = res['data']  
        console.log('>>>>>>>', this.classes)
      });
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
      let id= this.route.snapshot.paramMap.get('id');
      try {
         await this.service.upadteClass(this.classForm.value, id)
        return
      }
      catch (e) {
        this.toastr.error(e, "Oops!")
      }
  }
}
