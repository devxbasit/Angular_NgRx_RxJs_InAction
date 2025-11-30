import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  cartItems: Product[] = [];


  #http: HttpClient = inject(HttpClient);
  #notificationService: NotificationService = inject(NotificationService);

  products$: Observable<Product[]> = this.#http.get<Product[]>('https://fakestoreapi.com/products?limit=30');

  addToCart(product: Product) {

    console.log(this.cartItems.length);


    const existingProduct = this.cartItems.find(item => item.id === product.id)

    if (existingProduct) {

      existingProduct.quantity += 1;
      this.#notificationService.showSuccess(`${existingProduct.title} is already in the cart. Quantity updated to ${existingProduct.quantity}.`);

    } else {
      product.quantity = 1;
      this.cartItems.push(product);
      this.#notificationService.showSuccess(`${product.title} added in the cart.`);
    }
  }

  getCartItemsCount(): number {
    return this.cartItems.length;
  }

}