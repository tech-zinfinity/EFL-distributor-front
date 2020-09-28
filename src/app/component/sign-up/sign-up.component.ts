import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialogRef<SignUpComponent>
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      'id':null,
      'username':[null, Validators.required],
      'password':[null, Validators.required],
      'confirmpassword':[null, Validators.required],
      'roles':[["ROLE_USER"]],
      'active':true,
    })
  }

  signUp(value: SignUpForm){
    console.log(value);
    return this.auth.signUp(value).subscribe((data:User)=>{
      this.snackbar.open("Registered Successfully", "close", {duration:2000});
      this.dialog.close();
      this.router.navigate(['home']);
    },
    err=>{
      console.log(err);
      
      this.snackbar.open("Registeration Failed", "close", {duration:2000});
    }
    );
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmpassword() {
    return this.signupForm.get('confirmpassword');
  }

}
export interface SignUpForm{
  id?:string;
  username?:string;
  password?:string;
  roles?:string[];
  active?:boolean;
}
