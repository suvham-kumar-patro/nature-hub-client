import { Products } from "./products.model";

export class Cart {
    CartItemId:number;
    ProductId:number;
    Quantity:number;
    Product?:Products;
}