import { Injectable } from '@angular/core';
import { registerinfo } from '../models/registerAccountInterface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountService {

  //json server url
  jsonUrl: string = "http://localhost:3000/userinfo";

  //injecting HttpClient 
  constructor(private http: HttpClient) {}

  saveAccount(userInfoArray: registerinfo): Observable<registerinfo>{
    return this.http.post<registerinfo>(this.jsonUrl, userInfoArray);   //sending the info to the JSON server
  }

}
