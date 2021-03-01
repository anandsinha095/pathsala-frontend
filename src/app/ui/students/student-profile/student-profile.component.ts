import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../service/commonservice/common.service'
import { CommoncallService } from '../../../service/commoncall/commoncall.service';
import { StudentsService } from '../../../service/students/students.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  student: any;
  classes: any;
  class:any;
  constructor( private apiCall: CommoncallService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr:ToastrService, 
    private localData: CommonService,
    private service: StudentsService) { }

  ngOnInit(){
    let id= this.route.snapshot.paramMap.get('id');
    this.localData.checkLogin()
    this.apiCall.getRequestHeader("student/studentInfo/"+id, this.localData.getlocalData()['token']).subscribe((res:any) => {
      console.log('>>>>>>>', res['data'])
      this.student = res['data'];
      this.apiCall.getRequestHeader("classes/classList", this.localData.getlocalData()['token']).subscribe((res:any) => {
        this.classes = res['data']
        this.classes.forEach((ele: any) => {
          if(ele._id === this.student.classId)
            this.class = ele.name
            console.log('>>>>>>>', this.class )
        });        
      });
    });
  }

}
