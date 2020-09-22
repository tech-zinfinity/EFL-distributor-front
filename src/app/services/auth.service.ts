
import { LoginForm } from './../component/login/login.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpForm } from '../component/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: LoginForm) {
    return this.http.post(environment.serverUrl + '/auth/login', body);
  }

  signUp(body: SignUpForm) {
    return this.http.post(environment.serverUrl + '/auth/signup', body);
  }


}
