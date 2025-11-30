import { Component, inject } from '@angular/core';
import { CartApiService } from '../../services/cart-api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'ecommerce-products',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  #cartApiService: CartApiService = inject(CartApiService);

  products$: Observable<Product[]> = this.#cartApiService.products$;

  addToCart(product: Product): void {
    this.#cartApiService.addToCart(product);
  }

}
