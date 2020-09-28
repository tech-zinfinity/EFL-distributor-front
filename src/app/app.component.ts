
import { Component } from '@angular/core';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from './services/cart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    public dialog: MatDialog,
    public cartService: CartService,
    ) { }

  title = 'EFL-distributor-front';

  openSignupDialog() {
    this.dialog.open(SignUpComponent);


  }
}
