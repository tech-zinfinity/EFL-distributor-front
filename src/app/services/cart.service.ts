import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SellUnit } from './../entities/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './../entities/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  dummyproducts: SellUnit[] = [];
  productsSource = new BehaviorSubject(this.dummyproducts);
  productsObs = this.productsSource.asObservable();
  pincart = 0;
  
  authURL='/auth';

  constructor(private http: HttpClient) { }

  publishCart(products: SellUnit[]){
    this.productsSource.next(products);
    this.pincart = products.length;
    localStorage.setItem('cart', JSON.stringify(products));
  }

  clearCart(){
    this.productsSource.next(this.dummyproducts);
    this.pincart =0;
    localStorage.setItem('cart', JSON.stringify(this.dummyproducts));
  }

  generateOTP(email: string): Observable<boolean>{
    return this.http.get<boolean>(environment.serverUrl+this.authURL+'/generateOTPOnEmail/'+email);
  }

  verifyOTP(email: string, otp: string): Observable<boolean>{
    return this.http.get<boolean>(environment.serverUrl+this.authURL+'/verifyOTP/'+email+'/'+otp);
  }
}
