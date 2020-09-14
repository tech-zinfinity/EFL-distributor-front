import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enquiry } from '../entities/enquiry'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private http: HttpClient) { }

  enquiry='/common/public/enquiry';

  dummyEnquiryActiveList: Enquiry[] = [];
  enquiryActiveSource = new BehaviorSubject(this.dummyEnquiryActiveList);


  addEnquiry(body: any): Observable<Enquiry>{
    return this.http.post<Enquiry>(environment.serverUrl+this.enquiry+'/add',body);
  }

  getAllEnquiry(): Observable<Enquiry[]>{
    return this.http.get<Enquiry[]>(environment.serverUrl+this.enquiry+'/getAll');
  }

}

