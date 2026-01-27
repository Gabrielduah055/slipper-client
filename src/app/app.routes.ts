import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'categories', component: CategoryComponent },
    { path: 'shop', component: AllProductsComponent },
    { path: 'product-details', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' }
];
