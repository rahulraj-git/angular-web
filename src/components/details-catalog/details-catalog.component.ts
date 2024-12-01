import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-catalog',
  templateUrl: './details-catalog.component.html',
  styleUrls: ['./details-catalog.component.scss']
})
export class DetailsCatalogComponent implements OnInit {
  catalogId: string | null = null;
  productDetails: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.catalogId = params['id'];

      if (this.catalogId) {
        this.fetchProductDetails(this.catalogId);
      }
    });
  }

  fetchProductDetails(catalogId: string): void {
    const apiUrl = `https://rigidjersey.com/backend-api/api/get_catalog_details.php/?catalog_id=${catalogId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.success && response.data) {
          this.productDetails = response.data;
        }
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  onEnquireNow(): void {
    // You can add the logic for triggering an enquiry, e.g., opening a contact form
    alert('Enquiry has been sent!');
  }
  convertImageUrl(imagePath: string): string {
    const baseUrl1 = 'https://rigidjersey.com/backend-api';
    return baseUrl1 + imagePath.replace('..', ''); // Adjust the relative path to an absolute URL
  }
}