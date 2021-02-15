import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommoncallService {
  baseUrl = "http://3.141.104.102:5002/api/v1/";
  constructor(private http: HttpClient) { }

  postRequest(data:any, url:any) {
    return this.http.post(this.baseUrl + url, data);
  }
  postRequestHeader(data:any, url:any, header:any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    return this.http.post(this.baseUrl + url, data, { headers: { 'authorization': header } });
  }
  putRequestHeader(data:any, url:any, header:any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(this.baseUrl + url, data, { headers: { 'authorization': header } });
  }
  getRequest(data:any) {
    return this.http.get(this.baseUrl + data);
  }
  getRequestHeader(data:any, header:any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.baseUrl + data, { headers: { 'authorization': header } });
  }
  DeleteRequestHeader(url:any, header:any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.delete(this.baseUrl + url, { headers: { 'authorization': header } });
  }
}
