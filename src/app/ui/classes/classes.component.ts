import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../service/commonservice/common.service'
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { StudentsService } from '../../service/students/students.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes:any;
  constructor(
    private apiCall: CommoncallService,
    private router: Router,
    private toastr:ToastrService, 
    private localData: CommonService,
    private service: StudentsService
  ) { }

  ngOnInit() {
    this.localData.checkLogin()
    this.apiCall.getRequestHeader("classes/classList", this.localData.getlocalData()['token']).subscribe((res:any) => {
      this.classes = res['data'];
    });
  }
}
