import { Component , OnInit } from '@angular/core';
import { SellUnit } from './entities/cart';
import { CartService } from './services/cart.service';
import { ProgressService } from './services/progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'EFL-distributor-front';
  constructor( private router: Router,
    public cartService: CartService,
    public progressService: ProgressService){}

  ngOnInit() {
    let cart: SellUnit[] = JSON.parse(localStorage.getItem('cart'));
    if(cart === null ||  cart === undefined){
     this.cartService.clearCart();
    }else{
     cart = JSON.parse(localStorage.getItem('cart'));
     this.cartService.publishCart(cart);
    }
  }
}
