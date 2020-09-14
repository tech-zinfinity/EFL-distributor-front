import { Product } from './product';
export interface Cart {
    sellingUnits: SellUnit[]
}
export interface SellUnit{
    product?: any;
    quantity?: number;
    price?:number;
}

export interface SellingUnit{
    productName?: string,
    productId?:string,
    unit?:string,
    quantity?:number,
    netPrice?:number,
    totaltax?:number,
    finalPrice?:number
}
