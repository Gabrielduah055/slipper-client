import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  private productService = inject(ProductService);

  // Mapping for UI visualization to match existing design aesthetics with backend data
  categoryDetails: {[key: string]: {image: string, description: string}} = {
    "Half Shoe": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAZ3nXHCSLR62VTnHfF3ZFN_m-RTfIW_0JfXx46GKMkVI86W7YH-klEGSxeEN7fgoQJsUvw2nVLgHW8zYmyKgeL6780-4OXbk8uXvwy762CnHb0PbRYNUwAfjmkg0UEs3d_Q2s0IkOMDL9nVLVekz9vJi0HzQgdZvtBaWpV70nIvV0YJW03Y-IrgOQxwe4lnP56SuzxFwe11n4AkvEVhQqm6LzV5H01Kmg9iLaWRKEL-RP1Q4W3caE5n5N-MHLPF0CuKj4Dkl7aEwF",
      description: "Authentic leather slides and traditional designs for the modern gentleman."
    },
    "Sandal": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAeYpITv94WwzJ4_FAlQlGo6AR7TVQxjEIBHPZtNovhXgzzofgyOaIl_jrqO8yc1fhjuTJSOGxbYJGzRvB3uZnbmBH1c0lbaEBzOLH-HKDveWFMhS9Q-H4-JNvQlYfoN66_AXQtzakApOo_8vE5C2a0TtXZV2DtuRMPgBTp8XlWSAHbTjeoxSuFlvMXSfwHWatkNIN9I1IvUimlAPrPtJ4ULWDRxJJSyQtLUoCPPPxsiuW1hB_jsGvs83fBlc1ayKfD99HXWedxr5O",
      description: "Elegant beadwork and premium comfort combined with Ghanaian heritage."
    },
    "Slippers": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzOAzR4g5epOsPG4fXT5XXxHdZqD4YSrQyiCMl-n_rrahckA5Y-8TMM8-1TGdnG0w6tzOmWWgJ_htIMwmTonxV8sUuYe-5n-3kDRL7ylC_XzbmYeGUuN1TdpZm7mbsXOjMrTIAEW3FXlJLOTgtBjAjoyDeiP444qfmGBoJibTpbjaM8HDc7KFiRbgSXkajVNclkwHvwvRPGge6xkm26OmnYHVm-x7jCjLr36jin4Ng-JJffh-66bkijMikD985alrRMVCiuEXFdFsI",
      description: "Durable and colorful slippers designed for everyday comfort."
    },
    "Shoe": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfALm0-CWPtScSzTWahKixq42HRThqGdmOd7zeeUCC7hKegAfx-E8xJngFiocrj7FxXTILImZRm-CQ65LCojIWzLxnfoSD4usrYGE59fxD0fUwoBPjSQDcgngzCWtlmttUK6oEp7OrKLv5UlJkGi8XVF0IrZl87OVOhDhU4G85Jr0t4VtSjSIzVDP9oRbyHCX0rOgZMuajxIvPULNs2pgHvwAFIIQKJu8hJaGhEPSoaWA36fIsD_sHB2ej9eEfVsKlt9yIkxrfB9pi",
      description: "Premium grade calf leather, hand-dyed and stitched by master craftsmen."
    },
    "Sneaker": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsHyp3uFUVYAcH-dahMCJb52rkIjLFg0lTtQuueVfO-gxNu0qDpRESZFIZXy3DFGG8LkK9s9LfOCcfaSPQF9MIcJivK8KBmBZn5myCgxwFEax-OaLNI_MoI9ZdJGc_FvTQgebbQfnVg6TgxgzPUdwE6xC5vZCno0KBswGhga0SIyuiHLLvfqbwB_gTVV5G8cJE9GwRCWnMgG8RawEW-QP_jNZfIYCVdTGHC7E5pwnY-KyEYWALI-mGY04MLhn4ZU_3nvYjvv9pal56",
      description: "Festive editions and exclusive drops you can't miss."
    },
    "Others": {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYtG47v9DTBESFFc3x0yPnJ3XCBA9QrAKr23WsfIQlz4vWCTpmmTYhZg35fkak5IcUykUK0hlpkpzYJs7VMv6qux54zrho2tLiPYRm5k8vINRDnb69bg-FEcUFwnwDwrRub2XUjgjfYMAMDVkUaF2KUNwMF2VOSGeqIh3H4g5FV_PQkmkb-JhuIp41FjkbpE8ri0mA5Il3MzpdKEoiot5_vTayu4uamS_qX7OCit0fNaivtVk28ToAWT8hNZlfKamG2OrbarH9Ajz5",
        description: "Explore our unique collection of diverse styles."
    },
    "Custom": {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYtG47v9DTBESFFc3x0yPnJ3XCBA9QrAKr23WsfIQlz4vWCTpmmTYhZg35fkak5IcUykUK0hlpkpzYJs7VMv6qux54zrho2tLiPYRm5k8vINRDnb69bg-FEcUFwnwDwrRub2XUjgjfYMAMDVkUaF2KUNwMF2VOSGeqIh3H4g5FV_PQkmkb-JhuIp41FjkbpE8ri0mA5Il3MzpdKEoiot5_vTayu4uamS_qX7OCit0fNaivtVk28ToAWT8hNZlfKamG2OrbarH9Ajz5",
      description: "Your vision, our hands. Create your own unique pair with custom motifs."
    }
  };

  defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCAZ3nXHCSLR62VTnHfF3ZFN_m-RTfIW_0JfXx46GKMkVI86W7YH-klEGSxeEN7fgoQJsUvw2nVLgHW8zYmyKgeL6780-4OXbk8uXvwy762CnHb0PbRYNUwAfjmkg0UEs3d_Q2s0IkOMDL9nVLVekz9vJi0HzQgdZvtBaWpV70nIvV0YJW03Y-IrgOQxwe4lnP56SuzxFwe11n4AkvEVhQqm6LzV5H01Kmg9iLaWRKEL-RP1Q4W3caE5n5N-MHLPF0CuKj4Dkl7aEwF";

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (response) => {
        // Take only first 4 categories for the home page or specific ones
        this.categories = response.categories.slice(0, 4); 
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getDetails(category: string) {
    return this.categoryDetails[category] || { image: this.defaultImage, description: "Handcrafted quality." };
  }
}
