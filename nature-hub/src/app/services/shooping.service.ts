import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { HealthTips } from '../models/health-tips.model';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  newData: Products = new Products();
  newList: Products[] = [];
  readonly ppApiUrl = 'https://localhost:44337/api';

  constructor(private http: HttpClient ) { }
  private cart: Products[] = []
   getAll(){
      return this.http.get(`${this.ppApiUrl}/Product`).toPromise().then(res=>this.newList=res as Products[]);
    }
    getProductById(id: number) {
      return this.http.get<Products>(`${this.ppApiUrl}/Product/${id}`);
    }
    addToCart(cartItem: Cart) {
      return this.http.post(`${this.ppApiUrl}/CartItem`, cartItem);
    }
    getCartItems() {
      return this.http.get<Cart[]>(`${this.ppApiUrl}/CartItem`);
    }
   
    removeFromCart(cartItemId: number) {
      return this.http.delete(`${this.ppApiUrl}/CartItem/${cartItemId}`);
    }
    // getCartCount(): number {
    //   return this.shoppingService.getCartCount();
    // }
    getHealthTips() {
      return this.http.get<HealthTips[]>(`${this.ppApiUrl}/HealthTip`);
    }
}
