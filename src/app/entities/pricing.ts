import { TaxInfo } from './tax-info';
export interface Pricing {
    id?:string,
    price?:number,
    offerPrice?:number,
    cost?:number,
    margin?:number,
    unit?:string,
    deliveryCharge?:string,
    extCharge?:string,
    currency?:string,
    tag?:string,
    productId?:string,
    taxInfo?:TaxInfo
}
