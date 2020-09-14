import { OrderStage } from './order-stage';
import { SellingUnit } from './cart';
import { Address } from './address';
import { Contact } from './contact';

export interface Order {
    id?:string,
    status?:boolean,
    contact?:Contact,
    tag?:string,
    custName?:string,
    deliveryAddress?:Address,
    sellUnits?:SellingUnit[],
    paymentType?:string,
    transactionId?:string,
    currency?:string,
    razorpayOderId?:string,
    transaction?:string,
    createdOn?:Date,
    updatedOn?:Date,
    currentStage?:OrderStage,
    stages?:OrderStage[],
    email?:string,
    phone?:number,
    finalPrice?:number,
    deliveryCharge?:number,
    netPrice?:number,
    genericOrderId?:string,
    paid?:boolean,
    razorPayKey?:string,
    razorPayPaymentId?:string,
    razorPaySignature?:string
}
