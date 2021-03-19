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
  students: any
  classes: any
  studentData: any
  selectedClass:any
  selectAddress:any
  allDataStatus: Boolean= false
  totalAmount:any =0
  billFrom !: FormGroup;
  discountModes: any;
  finalAmount: any = 0
  billingList: any = ["Registration & Prospectus","Security Fee","Admission Fee", "Annual Fee", "Exam Fee", "Tuition Fee", "Computer Fee", "Transport Fee", "Dance Class Fee","Extra Activity Classes Fees", "Miscellaneous", "Arrears", "Fine"];
  constructor( 
    private localData: CommonService,
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private service: CreateStudentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiCall: CommoncallService,
  ) {}

  ngOnInit(){
    this.localData.checkLogin()
    this.billFrom = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(2)]],
      className: ['', [Validators.required]],
      email: [''],
      address: ['', [Validators.required]],
      phoneNumber:['',[Validators.required]],
      registration: ['', [<any>Validators.required, Validators.maxLength(12), Validators.minLength(2)]],
      security:  ['', [ Validators.maxLength(12), Validators.minLength(2)]],
      admission:  ['', [Validators.maxLength(12), Validators.minLength(2)]],
      annual:  ['', [ Validators.maxLength(12), Validators.minLength(2)]],
      exam:  ['', [<any>Validators.required,  Validators.maxLength(12), Validators.minLength(2)]],
      tuition:  ['', [<any>Validators.required,  Validators.maxLength(12), Validators.minLength(2)]],
      computer:  ['', [Validators.maxLength(12), Validators.minLength(2)]],
      dance:  ['', [Validators.maxLength(12), Validators.minLength(2)]],
      miscellaneous:  ['', [Validators.maxLength(12), Validators.minLength(2)]],
      extraActivityClasses:  ['', [Validators.maxLength(12), Validators.minLength(2)]],
      fine: ['', [Validators.maxLength(12), Validators.minLength(2)]],
      arrears: ['', [Validators.maxLength(12), Validators.minLength(2)]],
      discountType: [''],
      discount:['']
    })
    this.apiCall.getRequestHeader("student/studentList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.students = res['data'];
    });
  }
  async studentClassData(data:any){
   let studentInfo = this.students.filter((ele:any) => ele.result._id === this.billFrom.value.userId)
   this.studentData=studentInfo[0].result
   this.selectedClass=studentInfo[0].classes
   this.selectAddress = this.studentData.addressOne+" "+ this.studentData.addressTwo + ", "+ this.studentData.city+", "+this.studentData.state+", "+ this.studentData.zipcode
   if(this.studentData) this.allDataStatus= true;
    await  this.apiCall.getRequestHeader("classes/classInfo/"+this.studentData.classId, this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.classes = res['data'];
    });
  }
  ngAfterViewInit(){
    if(this.allDataStatus)
    this.onKeypressEvent("clicked");
  }

  onKeypressEvent(event: any){  
    let amount=  parseFloat(this.billFrom.value.registration)+ parseFloat(this.billFrom.value.security) + parseFloat(this.billFrom.value.admission)+ parseFloat(this.billFrom.value.annual)+ parseFloat(this.billFrom.value.exam)+ parseFloat(this.billFrom.value.tuition)+ parseFloat(this.billFrom.value.computer)+ parseFloat(this.billFrom.value.dance)+ parseFloat(this.billFrom.value.miscellaneous)+ parseFloat(this.billFrom.value.extraActivityClasses)+ parseFloat(this.billFrom.value.fine)+ parseFloat(this.billFrom.value.arrears)
    if(!isNaN(amount)){
      this.totalAmount = amount
    }
    if(!this.discountModes){
      this.finalAmount = this.totalAmount
    }
    else if(this.discountModes && this.billFrom.value.discount){
      this.discountKeyup(this.billFrom.value.discount)
    }
 }
 discountMode(){
  this.billFrom.value.discount = 0
   this.discountModes = this.billFrom.value.discountType
  }
discountKeyup(discount:any){
    if(this.discountModes == "rupyee"){ 
      if(!isNaN(this.totalAmount - parseFloat(this.billFrom.value.discount))) 
      this.finalAmount =this.totalAmount - parseFloat(this.billFrom.value.discount)
    } 
    else{
        if( parseFloat(this.billFrom.value.discount) > 50){
          this.billFrom.value.discount = 0
          this.toastr.error("Persentage should be less the 50%")
        }      
        else{
          if(!isNaN(this.totalAmount - (this.totalAmount * parseFloat(this.billFrom.value.discount)/100))) 
          this.finalAmount =this.totalAmount - (this.totalAmount * parseFloat(this.billFrom.value.discount)/100)
        }       
    }
}
 

}
