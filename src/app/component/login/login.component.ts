import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  //Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)])]
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  login(value: LoginForm) {
    this.auth.login(value)
      .subscribe((data: User) => {
        this.snackbar.open("Login Successfully", "close", { duration: 2000 });
        this.router.navigate(['home']);
      },
        err => {
          this.snackbar.open("Login Failed, please try again", "close", { duration: 2000 });
        });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

export interface LoginForm {
  username?: string,
  password?: string
}
