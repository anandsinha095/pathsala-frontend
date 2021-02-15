import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { Router, ActivatedRoute } from '@angular/router';
import {CommoncallService} from '../commoncall/commoncall.service'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiCall:CommoncallService
  ) { }


  getlocalData() {
    let obj:any = {}
    obj['userId'] = localStorage.getItem('userId')
    obj['token'] = localStorage.getItem('token')
    obj['userMail'] = localStorage.getItem('userMail')
    obj['firstName'] = localStorage.getItem('firstName')
    obj['lastName'] = localStorage.getItem('lastName')
    return obj;
  }
  setLocalData(sourceData:any) {
    localStorage.setItem('dataSource', JSON.stringify(sourceData));
    localStorage.setItem('userId', sourceData['data'].result['_id']);
    localStorage.setItem('token', sourceData['data']['jwt']);
    localStorage.setItem('userMail',sourceData['data'].result['email']);
    localStorage.setItem('firstName', sourceData['data'].result['firstName']);
    localStorage.setItem('lastName',sourceData['data'].result['lastName']);
  }
  checkLogin() {
    if (localStorage.getItem('token')) {
      return;
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  // checkLogin() {
  //   if (localStorage.getItem('token')) {
  //     return true;
  //   }
  //   else {
  //     this.router.navigate(['/login']);
  //   }
  // }
  // userInfo(data,header) {    
  //   let headers =new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  //   return this.http.get(this.apiCall.baseUrl+"user/userInfo/"+data,{ headers: { 'authorization': header }});  

  // }

}
