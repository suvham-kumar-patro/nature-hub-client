import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { ShoppingService } from '../services/shooping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems:Cart[]=[]
  constructor(private router: Router, private shoppingService: ShoppingService) {}
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

   removeFromCart(cartItemId: number) {
    if (confirm('Are you sure you want to remove this item from the cart?')) {
      this.shoppingService.removeFromCart(cartItemId).subscribe(() => {
        alert('Item removed from cart.');
        this.getCartItems(); // Refresh list
      });
    }
  }

  checkout() {
    alert('Proceeding to checkout...');
    this.router.navigate(['/Shopping']);
  }
}
