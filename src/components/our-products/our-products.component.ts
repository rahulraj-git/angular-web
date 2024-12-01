import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent {
  productList: any[] = [];
  chunkedProductList: any[] = []; // For grouping products into rows
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProductList();
    this.getDetails();
  }

  getProductList() {
    this.http.get('https://rigidjersey.com/backend-api/api/random_16_product.php').subscribe(
      (response: any) => {
        if (response.success) {
          this.productList = response.data;
          this.chunkedProductList = this.chunkArray(this.productList, 4); // Divide into chunks of 4
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
  getDetails() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_catalog_details.php/?catalog_id=189').subscribe(
      (response: any) => {
        debugger
        if (response.success) {
          this.productList = response.data;
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
}