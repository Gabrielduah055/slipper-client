import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems$ = this.cartService.cartItems$;

  get total(): number {
      return this.cartService.getCartTotal();
  }

  updateQuantity(productId: string, size: number, newQuantity: number) {
      if (newQuantity < 1) return;
      this.cartService.updateQuantity(productId, size, newQuantity);
  }

  removeItem(productId: string, size: number) {
      this.cartService.removeFromCart(productId, size);
  }

  clearCart() {
      this.cartService.clearCart();
  }
}
