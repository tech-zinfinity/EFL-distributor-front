import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire/";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './component/footer/footer.component';

import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { AddBillingInfoComponent } from './component/add-billing-info/add-billing-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerComponent,
    
    FooterComponent,
    

    ProductDetailsComponent,
    
    LoginComponent,
    
    SignUpComponent,
    
    CartComponent,
    
    CheckOutComponent,
    
    AddBillingInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
