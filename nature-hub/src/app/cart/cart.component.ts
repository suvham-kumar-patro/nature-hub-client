import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { ShoppingService } from '../services/shooping.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems:Cart[]=[]
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit() {
    this.getCartItems();
  }
   
   getCartItems(){
    this.shoppingService.getCartItems().subscribe(
      cartItems=>{
        console.log(cartItems)
       this.cartItems = cartItems
       this.cartItems.forEach(cartItem=>{
           this.shoppingService.getProductById(cartItem.ProductId).subscribe(
            product=>{
              cartItem.Product = product;
            },
            (error) => {
              console.error('Error fetching product details:', error);
            }
           )
       })
      }
    );
   }
}
