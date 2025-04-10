import { Component } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Products } from '../models/products.model';
import { ShoppingService } from '../services/shooping.service';

@Component({
  selector: 'app-shopping',
  standalone: false,
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent {
  products: Products[] = [];
  cart: Products[] = [];
  selectedProduct: Products = new Products();

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts() {
    this.shoppingService.getAll().then(() => {
      this.products = this.shoppingService.newList;
    });
  }
 
  addToCart(product: Products) {
    const cartItem: Cart = {
      ProductId: product.PId,
      Quantity: 1,
      CartItemId: 0,
    };
    this.shoppingService.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        alert(`${product.PName} is added to cart`)
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  // Get the cart count (number of items in the cart)
  // getCartCount(): number {
  //   return this.shoppingService.getCartCount();
  // }

}