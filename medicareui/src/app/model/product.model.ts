import { FileHandle } from "./file-handle.model";

export interface Product{
productId: number;

    productName: string,
    active:boolean,
    brand:string,
    quantity:number,
    productDescription:String,
    productDiscountedPrice:number,
    productActualPrice:number,
    productImages:FileHandle[]
    category:{
        id:number
    }
}

