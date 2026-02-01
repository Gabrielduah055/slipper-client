import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {
  orderId: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  order: Order | null = null;
  
  private orderService = inject(OrderService);

  trackOrder() {
    if (!this.orderId.trim()) return;

    this.isLoading = true;
    this.error = null;
    this.order = null;

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (res: any) => { // Assuming response structure { message: string, order: Order } based on controller
        this.order = res.order;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching order', err);
        this.error = 'Order not found. Please check your Order ID and try again.';
        this.isLoading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'hourglass_empty';
      case 'processing': return 'inventory_2';
      case 'shipped': return 'local_shipping';
      case 'delivered': return 'check_circle';
      case 'cancelled': return 'cancel';
      default: return 'help';
    }
  }
}
