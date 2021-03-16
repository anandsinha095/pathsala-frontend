import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/commonservice/common.service'
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(  private localData: CommonService,) { }

  ngOnInit() {
    this.localData.checkLogin()
  }

}
