import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load from local storage on init if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product, quantity: number, size: number) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(
      item => item.product._id === product._id && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      this.updateCart(updatedItems);
    } else {
      // Add new item
      this.updateCart([...currentItems, { product, quantity, size }]);
    }
  }

  removeFromCart(productId: string, size: number) {
    const updatedItems = this.cartItems.value.filter(
      item => !(item.product._id === productId && item.size === size)
    );
    this.updateCart(updatedItems);
  }

  updateQuantity(productId: string, size: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => {
      if (item.product._id === productId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    });
    this.updateCart(updatedItems);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.product.productPrice * item.quantity), 
      0
    );
  }

  private updateCart(items: CartItem[]) {
    this.cartItems.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }
  
  clearCart() {
      this.updateCart([]);
  }
}
