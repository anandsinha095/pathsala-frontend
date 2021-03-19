import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../service/commonservice/common.service'
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { StudentsService } from '../../service/students/students.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  students: any;
  classes: any;
  constructor(  private apiCall: CommoncallService,
    private router: Router,
    private toastr:ToastrService, 
    private localData: CommonService,
    private service: StudentsService) { }

  ngOnInit() {
    this.localData.checkLogin()
    this.apiCall.getRequestHeader("student/studentList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.students = res['data'];
    });
  }
  studentClassData(){
    this.apiCall.getRequestHeader("classes/classList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.classes = res['data'];
    });
  }

}
