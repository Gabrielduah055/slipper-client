import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { CategoryResponse } from '../interfaces/category.interface';
import { environment } from '../../environments/environment';
import { ProductResponse, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  
  // Cache variables to store the observables
  private categoriesCache$: Observable<CategoryResponse> | null = null;
  private productsCache$: Observable<ProductResponse> | null = null;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResponse> {
    // If cache exists, return it
    if (!this.categoriesCache$) {
      // Otherwise, create the request and share the result
      this.categoriesCache$ = this.http.get<CategoryResponse>(`${this.apiUrl}/categories`).pipe(
        shareReplay(1) // Cache the most recent value (buffer size 1)
      );
    }
    return this.categoriesCache$;
  }

  getAllProducts(): Observable<ProductResponse> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http.get<ProductResponse>(`${this.apiUrl}/`).pipe(
        shareReplay(1)
      );
    }
    return this.productsCache$;
  }

  getProductById(id: string): Observable<Product | undefined> {
    // Reuse the getAllProducts cache and find the specific product
    return this.getAllProducts().pipe(
      map(response => response.products.find(p => p._id === id))
    );
  }

  // Optional: Method to clear cache if you implement a "Refresh" button later
  clearCache() {
    this.categoriesCache$ = null;
    this.productsCache$ = null;
  }
}
