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
import { CartComponent } from './component/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerComponent,
    
    FooterComponent,
    
    CartComponent
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
