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
  productDetails: any = null; // Store product details here

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the catalog_id from query parameters
    this.route.queryParams.subscribe(params => {
      this.catalogId = params['id']; // Get the 'id' from the query parameter

      if (this.catalogId) {
        this.fetchProductDetails(this.catalogId); // Fetch product details if id exists
      }
    });
  }

  fetchProductDetails(catalogId: string): void {
    const apiUrl = `https://rigidjersey.com/backend-api/api/get_catalog_details/?catalog_id=${catalogId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        debugger
        // Assuming response contains the product details in 'data'
        if (response.success && response.data) {
          this.productDetails = response.data;
        }
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }
}