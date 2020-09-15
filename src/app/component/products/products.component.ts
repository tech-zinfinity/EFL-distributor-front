import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SellUnit } from 'src/app/entities/cart';
import { Product } from 'src/app/entities/product';
import { ProductShortInfo } from 'src/app/entities/product-short-info';
import { CartService } from 'src/app/services/cart.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product: Product = {};
  id: string;
  list: ProductShortInfo[] = [];
  ogList: ProductShortInfo[] = [];
  filterList: ProductShortInfo[] = [];
  products: Product[] = [];
  productsObs = this.cartService.productsObs;
  cart: SellUnit[] = [];

  constructor(
    private productService: ProductService,
    private storage: FireStorageService,
    public progressService: ProgressService,
    private snackbar: MatSnackBar,
    private router: Router,
    private cartService: CartService,
  ) {
    this.progressService.spinbool = true;
    this.productService.getAllActiveProducts().subscribe(data => {
      this.progressService.spinbool = false;
      data.forEach(prod => {
        prod.tempImages = [];
        prod.images.forEach(i => {
          this.storage.getDocument(i).subscribe(img => {
            prod.tempImages.push(img);
          })
        })
      });
      this.list = data;
      this.ogList = data;
      this.filterList = data;

      // ref.close();
    }, err => {
      console.log(err);

    });

  }


  ngOnInit(): void {
  }
  addToCart(product: any) {
    console.log(product);
    console.log(this.cart);

    if (this.cart != null) {
      let bool = false;
      if (this.cart.length > 0) {
        this.cart.forEach(data => {
          if (data.product.id === product.id) {
            bool = true;
          }
        });
        if (bool) {
          this.snackbar.open('Product is alreday available in Cart', 'close', { duration: 2000 })
        } else {
          let sell: SellUnit = {
            product : product,
            quantity: 1,
            price: product.price
          }
          this.cart.push(sell);
          this.cartService.publishCart(this.cart);
          this.snackbar.open('Product is added in Cart', 'close', { duration: 2000 })
        }
      } else {
        let sell: SellUnit = {
          product: product,
          quantity: 1,
          price: product.price
        }
        this.cart.push(sell);
        this.cartService.publishCart(this.cart);
        this.snackbar.open('Product is added in Cart', 'close', { duration: 2000 })
      }

    } else {
      this.snackbar.open('Cart is null', 'close', { duration: 2000 })
    }
  }

  displayProducts(id) {
    this.router.navigate(['productdetails', id])
  }

}
