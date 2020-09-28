import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SellUnit } from 'src/app/entities/cart';
import { Product } from 'src/app/entities/product';
import { CartService } from 'src/app/services/cart.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {};
  productsObs = this.cartService.productsObs;
  cart: SellUnit[] = [];
  id: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private storage: FireStorageService,
    public progressService: ProgressService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.progressService.spinbool = true;
      this.productService.getProductById(this.id).subscribe(data => {
        this.progressService.spinbool = false;
        data.tempImages = [];
        data.images.forEach(i => {
          this.storage.getDocument(i).subscribe(img => data.tempImages.push(img));
        })
        this.product = data;
      })
    });
    this.cartService.productsObs.subscribe(data => {
      this.cart = data;
    });
  }

  ngOnInit(): void {
  }

  // enquireDialog(){
  //   this.dialog.open(EnquireComponent,{
  //     disableClose:true,
  //     width:'75%',
  //     height:'90%'

  //   });
  // }

  addToCart(product: Product){
    if(this.cart!=null){
      let bool = false;
      if(this.cart.length >0){
       this.cart.forEach(data =>{
         if(data.product.id === product.id){
           bool = true;
         }
       });
       if(bool){
           this.snackbar.open('Product is alreday available in Cart', 'close', {duration: 2000})
       }else{
         let sell: SellUnit ={
           product: product,
           quantity: 1,
           price: product.pricing.price
         }
         this.cart.push(sell);
         this.cartService.publishCart(this.cart);
         this.snackbar.open('Product is added in Cart', 'close', {duration: 2000})
       }
      }else{
         let sell: SellUnit ={
           product: product,
           quantity: 1,
           price: product.pricing.price
         }
         this.cart.push(sell);
         this.cartService.publishCart(this.cart);
         this.snackbar.open('Product is added in Cart', 'close', {duration: 2000})
      }
 
    }else{
     this.snackbar.open('Cart is null', 'close', {duration: 2000})
    }
   }

}
