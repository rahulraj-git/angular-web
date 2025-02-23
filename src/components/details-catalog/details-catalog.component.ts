import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

declare var gtag: Function;

@Component({
  selector: 'app-details-catalog',
  templateUrl: './details-catalog.component.html',
  styleUrls: ['./details-catalog.component.scss']
})
export class DetailsCatalogComponent implements OnInit {
  catalogId: string | null = null;
  productDetails: any = null;
  productsList: any[] = [];
  currentIndex: number = 0;
  hasNextProduct: boolean = false;
  hasPreviousProduct: boolean = false;
  isNavigating: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.fetchRandomProducts().then(() => {
      this.route.queryParams.subscribe(params => {
        this.catalogId = params['id'];
        if (this.catalogId && this.productsList.length > 0) {
          this.currentIndex = this.productsList.findIndex(
            p => Number(p.id) === Number(this.catalogId)
          );
          this.updateNavigationState();
          this.fetchProductDetails(this.catalogId);
          this.isNavigating = false;
        }
      });
    });
  }

  async fetchRandomProducts(): Promise<void> {
    try {
      // Use the same API as Our Products component
      const response: any = await this.http.get('https://rigidjersey.com/backend-api/api/random_16_product.php').toPromise();
      if (response.success) {
        this.productsList = response.catalogs;
        this.updateNavigationState();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  updateNavigationState(): void {
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.productsList.length) {
      this.currentIndex = this.productsList.length - 1;
    }

    this.hasPreviousProduct = this.currentIndex > 0;
    this.hasNextProduct = this.currentIndex < (this.productsList.length - 1);
    
    console.log('Navigation State Updated:', {
      currentIndex: this.currentIndex,
      hasPrevious: this.hasPreviousProduct,
      hasNext: this.hasNextProduct,
      totalProducts: this.productsList.length
    });
  }

  navigateToNext(): void {
    if (this.hasNextProduct && !this.isNavigating) {
      this.isNavigating = true;
      const nextProduct = this.productsList[this.currentIndex + 1];
      
      if (nextProduct) {
        this.router.navigate(['/details-catalog'], { 
          queryParams: { id: nextProduct.id }
        }).then(() => {
          this.fetchProductDetails(nextProduct.id);
        }).catch(error => {
          console.error('Navigation error:', error);
          this.isNavigating = false;
        });
      } else {
        this.isNavigating = false;
      }
    }
  }

  navigateToPrevious(): void {
    if (this.hasPreviousProduct && !this.isNavigating) {
      this.isNavigating = true;
      const prevProduct = this.productsList[this.currentIndex - 1];
      
      if (prevProduct) {
        this.router.navigate(['/details-catalog'], { 
          queryParams: { id: prevProduct.id }
        }).then(() => {
          this.fetchProductDetails(prevProduct.id);
        }).catch(error => {
          console.error('Navigation error:', error);
          this.isNavigating = false;
        });
      } else {
        this.isNavigating = false;
      }
    }
  }

  fetchProductDetails(id: string): void {
    const url = `https://rigidjersey.com/backend-api/api/get_catalog_details.php/?catalog_id=${id}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.productDetails = response.data;
          this.isNavigating = false;
        }
      },
      error => {
        console.error('Error fetching product details:', error);
        this.isNavigating = false;
      }
    );
  }

  onEnquireNow(): void {
    const phoneNumber = '+918073877920'; // Replace with your WhatsApp number
    const message = `Hello! I would like to know more about your product details Unique Code=${this.productDetails.unique_code}`; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
 // Google Analytics tracking code
 if (typeof gtag !== 'undefined') {
  gtag('event', `enquire_now_clicked_${this.productDetails.unique_code}`, {
    event_category: 'Engagement',
    event_label: `Enquire Now - ${this.productDetails.unique_code}`,
    value: this.productDetails.unique_code
  });
}
  }
  convertImageUrl(imagePath: string): string {
    const baseUrl1 = 'https://rigidjersey.com/backend-api';
    return baseUrl1 + imagePath?.replace('..', ''); // Adjust the relative path to an absolute URL
  }
  goBack(): void {
    // Navigate to the Our Products section
    this.router.navigate(['/'], { fragment: 'products' }).then(() => {
      // Scroll to the products section after navigation
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });

    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'back_to_products', {
        event_category: 'Navigation',
        event_label: 'Back from Product Details'
      });
    }
  }
}