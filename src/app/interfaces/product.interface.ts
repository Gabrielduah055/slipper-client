export interface Product {
  _id: string;
  category: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productThumbnailImages: string[];
  productStock: number;
  productSize: number;
  productDescription: string;
  isActive: boolean;
  createdAt?: string;
}

export interface ProductResponse {
    message: string;
    products: Product[];
}
