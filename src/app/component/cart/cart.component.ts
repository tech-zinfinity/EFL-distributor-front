
import { Component, OnInit } from '@angular/core';
import { SellUnit } from 'src/app/entities/cart';
import { CartService } from 'src/app/services/cart.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productsObs = this.cartService.productsObs;

  sellUnits: SellUnit[] = [];
  cartPrice: number = 0;

  constructor(
    private cartService: CartService,
    private storage: FireStorageService
  ) { }

  ngOnInit(): void {
    this.productsObs.subscribe(data => {
      this.sellUnits = data;
      if (this.cartPrice === 0) {

        this.sellUnits.forEach(data => {
          // console.log(data.price);
          this.increaseCartPrice(data.price);

        });

        this.sellUnits.forEach(s => {
          s.product.tempImages = [];
          s.product.images.forEach(i => {
            this.storage.getDocument(i).subscribe(img => {
              s.product.tempImages.push(img);
            })
          });
        });
      }
    });
  }

  removeFromCart(product: SellUnit) {
ts.splice(this.sellUnits.indexOf(product), 1);
    this.decreaseCartPrice(product.price);
    this.cartService.publishCart(this.sellUnits);
  }


  increaseCartPrice(value: number) {
    this.cartPrice = this.cartPrice + value;
  }
  decreaseCartPrice(value: number) {
    this.cartPrice = this.cartPrice - value;
  }

  decrementQuantity(product: any) {
    if (product.pricing === undefined) {
      this.sellUnits.forEach(sell => {
        if (sell.product.id === product.id) {
          if (sell.quantity > 1) {
            sell.quantity = sell.quantity - 1;
            this.decreaseCartPrice(sell.price);
            sell.price = product.price * sell.quantity;
            this.increaseCartPrice(sell.price);
            this.cartService.publishCart(this.sellUnits);
          } else {

 
            this.removeFromCart(sell);
          }
        }
      })    } else {
      this.sellUnits.forEach(sell => {
        if (sell.product.id === product.id) {
          if (sell.quantity > 1) {
            sell.quantity = sell.quantity - 1;
            this.decreaseCartPrice(sell.price);
            sell.price = product.pricing.price * sell.quantity;
            this.increaseCartPrice(sell.price);
            this.cartService.publishCart(this.sellUnits);
          } else {

            this.removeFromCart(sell);
          }
        }
      })
    }

  }


  incrementQuantity(product: any) {
    if (product.pricing === undefined) {
      this.sellUnits.forEach(sell => {
        if (sell.product.id === product.id) {
          sell.quantity = sell.quantity + 1;
          this.decreaseCartPrice(sell.price);
          sell.price = product.price * sell.quantity;
          this.increaseCartPrice(sell.price);
          this.cartService.publishCart(this.sellUnits);
        }
      })
    } else {
      this.sellUnits.forEach(sell => {
        if (sell.product.id === product.id) {
          sell.quantity = sell.quantity + 1;
          this.decreaseCartPrice(sell.price);
          sell.price = product.pricing.price * sell.quantity;
          this.increaseCartPrice(sell.price);
          this.cartService.publishCart(this.sellUnits);
        }
      })
    }
  }

}

