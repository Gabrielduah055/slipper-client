import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  cartItems$ = this.cartService.cartItems$;
  checkoutForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]*$/)]],
      address: ['', Validators.required],
      paymentMethod: ['momo', Validators.required]
    });
  }

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

  setPaymentMethod(method: string) {
    this.checkoutForm.patchValue({ paymentMethod: method });
  }

  async onSubmit() {
    if (this.checkoutForm.invalid || this.cartService.getCartTotal() === 0) return;

    this.isSubmitting = true;
    const formValue = this.checkoutForm.value;
    
    try {
      const currentItems = await firstValueFrom(this.cartItems$);

      // Simplify items to just the essential IDs and quantities
      // This avoids sending extra fields (like images/names) that strict backends might reject
      const orderItems = currentItems.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      }));

      // 2. Construct the payload matching the backend controller
      const orderData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        items: orderItems
      };

      console.log('Sending Order Payload:', orderData);

      // Cast to 'any' temporarily to allow the structural change without interface errors
      this.orderService.createOrder(orderData as any).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.cartService.clearCart();
          alert('Order placed successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Order creation failed:', err);
          
          const errorMessage = err.error?.message || err.error || 'Unknown error';
          alert(`Failed to place order: ${JSON.stringify(errorMessage)}`);
        }
      });
    } catch (error) {
      this.isSubmitting = false;
      console.error('Error preparing order', error);
    }
  }
}
