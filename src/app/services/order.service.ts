import { Order } from './../entities/order';
import { SellingUnit } from './../entities/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  odrerURL='/ef/public/order';

  calculateCheckoute(sells: SellingUnit[]){
    let body = {
      sellUnits: sells
    }
    return this.http.post(environment.serverUrl+this.odrerURL+'/calculate', body);
  }

  placeOrder(order: Order){
    return this.http.post(environment.serverUrl+this.odrerURL+'/placeOrder',order)
  }

  getOrderById(id: string){
    return this.http.get(environment.serverUrl+this.odrerURL+'/getById/'+id);
  }

  getOrderByEmail(email: string){
    return this.http.get(environment.serverUrl+this.odrerURL+'/getByEmail/'+email);
  }

  placeOrderWithOnlinePayment(order: Order){
    return this.http.post(environment.serverUrl+this.odrerURL+'/placeOrderWithOnlinePayment',order)
  }

  captureOrder(order: Order){
    return this.http.post(environment.serverUrl+this.odrerURL+'/captureOrder',order)
  }
}
