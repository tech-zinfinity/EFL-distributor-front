import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellingUnit } from 'src/app/entities/cart';
import { Order } from 'src/app/entities/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {Location} from '@angular/common';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  sellUnits: SellingUnit[] = [];
  totalPrice: number = 0;
  deliveryCharge: number = 30;
  finalPrice: number = 0;
  currentOrder: Order;

  constructor(
    private cartservice: CartService,
    private dialog: MatDialog,
    private orderservice: OrderService,
    private spinner: SpinnerService,
    private location: Location,
    private snackbar: MatSnackBar,
    private router: Router,
    private winRef: WindowRefService,
  ) { }

  ngOnInit(): void {
    this.currentOrder = null;
    let sub = this.cartservice.productsObs.subscribe(data => {
      let sells: SellingUnit[] = [];
      if (data.length > 0) {
        data.forEach(w => {
          let u: SellingUnit = {
            productId: w.product.id,
            quantity: w.quantity,
            finalPrice: 0,
            netPrice: 0,
            productName: w.product.displayName,
            totaltax: 0,
            unit: 'NA'
          }
          sells.push(u);
        });
        let spin = this.spinner.open();
        this.orderservice.calculateCheckoute(sells)
          .subscribe((tata: SellingUnit[]) => {
            sub.unsubscribe();
            this.sellUnits = tata;
            spin.close();
            this.sellUnits.forEach(t => {
              this.totalPrice = this.totalPrice + t.finalPrice;
            });
            this.deliveryCharge = 1;
            this.finalPrice = this.totalPrice + this.deliveryCharge;
          });
        // this.currentOrder = JSON.parse(localStorage.getItem('efcuorder'));
        // console.log(this.currentOrder);

      } else {
        this.location.back();
      }

    });

  }
  // VerifyCustomer() {
    // let ref = this.dialog.open(AddBillingInfoComponent, {
    //   height: '85%',
    //   width: '90%',
    //   data: this.sellUnits
    // });
  //   ref.componentInstance.orderFo rmed.subscribe(od => {
  //     ref.close();
  //     this.currentOrder = od;
  //     this.currentOrder.deliveryCharge = this.deliveryCharge;
  //     this.currentOrder.finalPrice = this.finalPrice;
  //     this.currentOrder.netPrice = this.totalPrice;
  //     // localStorage.setItem('efcuorder', JSON.stringify(this.currentOrder));
  //   })
  // }

  placeOrder() {
    let spin = this.spinner.open();
    this.orderservice.placeOrder(this.currentOrder).subscribe((data: Order) => {
      spin.close();
      this.currentOrder = null;
      localStorage.setItem('efEmail', data.email);
      this.cartservice.clearCart();
      this.router.navigate(['track']);
      this.snackbar.open('Your Order is placed, you can track the order on this page', 'close',
        { duration: 2000 });
    });
  }

  placeOrderOnline() {
    let spin = this.spinner.open();
    this.orderservice.placeOrderWithOnlinePayment(this.currentOrder).subscribe((data: Order) => {
      spin.close();
      this.payWithRazor(data);
      // this.currentOrder = null;
      // localStorage.setItem('efEmail', data.email);
      // this.cartservice.clearCart();
      // this.router.navigate(['track']);
      // this.snackbar.open('Your Order is placed, you can track the order on this page', 'close',
      // {duration: 2000});
    });
  }
  payWithRazor(order: Order) {
    let payment = order.finalPrice * 100;
    // console.log(payment);

    const options: any = {
      key: order.razorPayKey,
      amount: 12000, // amount should be in paise format to display Rs 1255 without decimal point
      currency: order.currency,
      name: 'Earthen Flavours', // company name or product name
      description: '',  // product description
      image: '../../../assets/img/logo/EARTHAN FLAVOURS-FINAL LOGO-1.png', // company logo or product image
      order_id: order.razorpayOderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      // console.log(response);
      // call your backend api to verify payment signature & capture transaction
      order.razorPayPaymentId = response.razorpay_payment_id;
      order.razorPaySignature = response.razorpay_signature;
      let spin2 = this.spinner.open();
      this.orderservice.captureOrder(order).subscribe((od: Order) => {
        spin2.close();
        if (od != null) {
          this.currentOrder = null;
          localStorage.setItem('efEmail', od.email);
          this.cartservice.clearCart();
          this.router.navigate(['track']);
          this.snackbar.open('Your Order is placed, you can track the order on this page', 'close',
            { duration: 2000 });
        } else {
          this.snackbar.open('There is some problem with Payment, please try again later', 'close', { duration: 2000 });
        }
      }, err => {
        this.snackbar.open('There is some problem with Payment, please try again later', 'close', { duration: 2000 });
        console.log(err);
      });
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
