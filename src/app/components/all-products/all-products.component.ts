import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  isLoading = true;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.isLoading = true;
    
    // Fetch categories first
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
      }
    });

    // Fetch all products
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        
        // Listen to query params for filtering
        this.route.queryParams.subscribe(params => {
          this.selectedCategory = params['category'] || null;
          this.filterProducts();
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.isLoading = false;
      }
    });
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(p => 
        p.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  // Helper to toggle category filter from UI checkbox
  toggleCategory(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategory = category;
    } else {
      this.selectedCategory = null;
    }
    this.filterProducts();
  }

  // Count products per category
  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }
}
