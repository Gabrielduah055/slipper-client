import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable, map } from 'rxjs';
import { CartItem } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isSearchOpen = false;
  
  cartService = inject(CartService);
  
  // Create an Observable that emits the total count of items
  cartCount$: Observable<number> = this.cartService.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isSearchOpen = false;
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isSearchOpen = false;
  }
}
