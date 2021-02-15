import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: any;
  constructor(    private apiCall: CommoncallService,
    private router: Router,
    private toastr:ToastrService, 
    private localData: CommonService) { }

  ngOnInit() {
      this.localData.checkLogin()
    this.apiCall.getRequestHeader("student/studentList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.students = res['data'];
    });
  }

}
