import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { StudentsService } from '../../../service/students/students.service';
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
    private localData: CommonService,
    private service: StudentsService) { }

  ngOnInit() {
      this.localData.checkLogin()
    this.apiCall.getRequestHeader("student/studentList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.students = res['data'];
    });
  }
  async clickMethod(id:any) {
    if (confirm('Do you want to change the status!')) {
      try {
        let data = {userId : id}
        await this.service.studentToggle(data)  
        setTimeout(() => { this.ngOnInit() }, 1000 * 1)
        return
     }
     catch (e) {
       this.toastr.error(e, "Oops!")
     }
    }
  }
  async clickActive(id:any) {
    if (confirm('Do you want to approve the student account!')) {
      try {
        let data = {userId : id}
        await this.service.studentIsActive(data)
        setTimeout(() => { this.ngOnInit() }, 1000 * 1)
        return
     }
     catch (e) {
       this.toastr.error(e, "Oops!")
     }
    }
  }
}
