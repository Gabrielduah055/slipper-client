import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load initial cart from local storage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product, size: number, quantity: number) {
    const currentCart = this.cartItems.value;
    const existingItemIndex = currentCart.findIndex(item => item.productId === product._id && item.size === size);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += quantity;
      this.cartItems.next(updatedCart);
    } else {
      // Add new item
      const newItem: CartItem = {
        productId: product._id,
        productName: product.productName,
        productImage: product.productImage,
        price: product.productPrice,
        size: size,
        quantity: quantity
      };
      this.cartItems.next([...currentCart, newItem]);
    }
    this.saveCartToStorage();
  }

  removeFromCart(productId: string, size: number) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(item => !(item.productId === productId && item.size === size));
    this.cartItems.next(updatedCart);
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, size: number, quantity: number) {
    const currentCart = this.cartItems.value;
    const itemIndex = currentCart.findIndex(item => item.productId === productId && item.size === size);

    if (itemIndex > -1) {
      const updatedCart = [...currentCart];
      updatedCart[itemIndex].quantity = quantity;
      if (updatedCart[itemIndex].quantity <= 0) {
        this.removeFromCart(productId, size);
      } else {
        this.cartItems.next(updatedCart);
        this.saveCartToStorage();
      }
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCartToStorage();
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}
