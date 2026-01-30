export interface Customer {
    _id: string;
    fullName: string;
    phoneNumber: string;
    whatsappNumber?: string;
    email?: string;
    address: string;
    orders?: string[]; // Array of Order IDs
    createdAt: Date;
}
