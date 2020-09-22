import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SellUnit } from 'src/app/entities/cart';
import { Product } from 'src/app/entities/product';
import { SubCategory } from 'src/app/entities/sub-category';
import { CartService } from 'src/app/services/cart.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { ProgressService } from 'src/app/services/progress.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subcategories: SubCategory[] = [];
  id: string;
  productsObs = this.cartService.productsObs;
  cart: SellUnit[] = [];

  subCategoryProductMapList: SubCategoryProductMap[] = [];

  constructor(
    private subcategoryService: SubcategoryService,
    public progressService: ProgressService,
    private productService: ProductService,
    private storage: FireStorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cartService: CartService,
  ) {

  }


  ngOnInit(): void {
    this.subcategoryService.getAllActiveSubCategories().subscribe(data => {
      this.subcategories = data;
      this.subcategories.forEach(subcat => {
        let obj: SubCategoryProductMap = {
          subCatId: subcat.id,
          subCatName: subcat.displayName
        };
        this.productService.getAllActiveProductsBySubCategoryId(subcat.id).subscribe(prods => {
          obj.products = prods;
          obj.products.forEach(prod => {
            prod.tempImages = [],
              this.storage.getDocument(prod.images[0]).subscribe(img => {
                prod.tempImages[0] = img;
              });
          });
          this.subCategoryProductMapList.push(obj);
        });
      });
    }, err => {
      console.log(err);
    });
  }
  displayProducts(id) {
    this.router.navigate(['productdetails', id])
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
            product: product,
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
        this.snackbar.open('Product is added in Cart', 'close',{ 
          duration: 2000,
          // panelClass: ['blue-snackbar']
        });
      }

    } else {
      this.snackbar.open('Cart is null', 'close', { duration: 2000 })
    }
  }

}

export interface SubCategoryProductMap {
  subCatName?: String,
  subCatId?: String,
  products?: Product[]
}