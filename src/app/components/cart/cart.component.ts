import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

declare const PaystackPop: any;

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
    const paymentMethod = formValue.paymentMethod;

    if (paymentMethod === 'cod') {
        // Cash on Delivery - Create order directly
        this.createOrder('pending', { method: 'cod', status: 'pending' });
    } else {
        this.startPaystackPayment();
    }
  }

  startPaystackPayment() {
    const formValue = this.checkoutForm.value;

    const handler = PaystackPop.setup({
      key: environment.paystackPublicKey,
      email: formValue.email,
      amount: this.total * 100,
      currency: 'GHS',
      ref: `SLIPPERS-${Date.now()}`,
      channels: ['card', 'mobile_money'],
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: `${formValue.firstName} ${formValue.lastName}` },
          { display_name: 'Phone Number', variable_name: 'phone_number', value: formValue.phoneNumber }
        ]
      },
      mobile_money: {
        phone: formValue.phoneNumber
      },
      callback: (response: any) => this.onPaymentSuccess(response),
      onClose: () => this.onPaymentCancel()
    });

    handler.openIframe();
  }

  onPaymentCancel() {
    this.isSubmitting = false;
    alert('Payment cancelled');
  }

  onPaymentSuccess(ref: any) {
    // Payment successful, create the order
    const paymentInfo = {
        method: this.checkoutForm.value.paymentMethod, // 'momo' or 'card'
        status: 'paid',
        transactionId: ref.reference
    };
    this.createOrder('processing', paymentInfo); // Status 'processing' as it's paid
  }

  async createOrder(initialStatus: string, paymentInfo: any) {
    try {
      const currentItems = await firstValueFrom(this.cartItems$);
      const formValue = this.checkoutForm.value;

      const orderItems = currentItems.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      }));

      const orderData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        items: orderItems
      };

      console.log('Sending Order Payload:', orderData);

      this.orderService.createOrder(orderData as any).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.cartService.clearCart();
          
          let message = 'Order placed successfully!';
          if (paymentInfo.status === 'paid') {
              message += ' Payment confirmed.';
          } else {
              message += ' Please pay on delivery.';
          }
          
          alert(message);
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
