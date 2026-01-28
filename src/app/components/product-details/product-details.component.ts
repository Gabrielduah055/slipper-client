import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  mainImage: string = '';
  relatedProducts: Product[] = [];
  selectedSize: number | null = null;
  quantity: number = 1;
  
  // Available sizes range
  availableSizes: number[] = [38, 39, 40, 41, 42, 43, 44, 45];
  
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
            this.loadProduct(id);
        }
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.initializeProductView(product);
          this.loadRelatedProducts(product.category);
        }
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  initializeProductView(product: Product) {
    this.mainImage = product.productImage;
    // Ensure productSize is selected
    this.selectedSize = product.productSize;
    // Reset quantity
    this.quantity = 1;
    
    // Scroll to top when loading new product
    window.scrollTo(0, 0);
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }

  loadRelatedProducts(category: string) {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        // Filter by same category, exclude current product, take 4
        this.relatedProducts = res.products
          .filter(p => p.category === category && p._id !== this.product?._id)
          .slice(0, 4);
      }
    });
  }

  isSizeAvailable(size: number): boolean {
    return size === this.product?.productSize;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product && this.selectedSize) {
      this.cartService.addToCart(this.product, this.quantity, this.selectedSize);
      // Optional: Show a toast/notification here
    }
  }

  buyItNow() {
    if (this.product && this.selectedSize) {
      this.cartService.addToCart(this.product, this.quantity, this.selectedSize);
      this.router.navigate(['/cart']);
    }
  }
}
