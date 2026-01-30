import { CartItem } from './cart.interface';

export interface CustomerInfo {
    fullName: string;
    phoneNumber: string;
    whatsappNumber?: string;
    deliveryAddress: string;
}

export interface Order {
    _id?: string;
    customer: CustomerInfo;
    items: CartItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: 'momo' | 'card' | 'cod';
    createdAt?: Date;
}
