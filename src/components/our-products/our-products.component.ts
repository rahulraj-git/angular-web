import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

declare var gtag: any;

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent {
  productList: any[] = [];
  chunkedProductList: any[] = []; // For grouping products into rows
  isMobile: boolean = false; // Flag to check if the screen is mobile

  constructor(private http: HttpClient,private router: Router,) {}

  ngOnInit() {
    this.checkScreenSize(); // Check initial screen size
    this.getProductList();
    // this.getDetails();
  }

  // Listen to window resize events to handle responsive design
  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Check if the screen is mobile
   // Update chunking based on screen size
  }

  getProductList() {
    this.http.get('https://rigidjersey.com/backend-api/api/random_16_product.php').subscribe(
      (response: any) => {
        if (response.success) {
          this.productList = response.catalogs;
          this.updateChunking(); // Adjust chunking after fetching the data
        } else {
          alert('Failed to fetch product list.');
        }
      },
      (error) => {
        console.error('Error fetching product list:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  // Utility method to split the product list into chunks
  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  // Update chunking logic based on the screen size
  updateChunking() {
    const chunkSize = this.isMobile ? 1 : 4; // If mobile, set chunk size to 1, else 4
    this.chunkedProductList = this.chunkArray(this.productList, chunkSize);
  }

  // Optional: Method to adjust image on hover
  hoverImage(imageUrl: string) {
    console.log(`Hovered over image: ${imageUrl}`);
  }

  resetImage() {
    console.log('Image reset');
  }

  // Convert relative image URL to absolute URL
  convertImageUrl(imageUrl: string): string {
    const baseUrl = 'https://rigidjersey.com/backend-api/';
    // Replace "../" with an empty string to correct the path
    const correctedUrl = imageUrl.replace(/\.\.\//g, '');
    return `${baseUrl}${correctedUrl}`;
  }

  // getDetails() {
  //   this.http.get('https://rigidjersey.com/backend-api/api/get_catalog_details.php/?catalog_id=189').subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         this.productList = response.data;
  //         this.updateChunking(); // Adjust chunking after fetching the details
  //       } else {
  //         alert('Failed to fetch product list.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching product list:', error);
  //       alert('An error occurred. Please try again.');
  //     }
  //   );
  // }
  navigateToProductDetails(product:any){
    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', `${product.name}_details_checked`, {
        event_category: 'Product',
        event_label: product.name,
        value: product.id
      });
    }

    this.router.navigate(['/details-catalog'], { queryParams: { id: product.id } });
  }
}