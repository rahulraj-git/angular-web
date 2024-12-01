import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent implements OnInit {
  categoryId: string | null = null;
  categoryData: any = null; // Store the response data from the API

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Retrieve the category id from the route parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params['id']; // Get 'id' from the query parameters
      if (this.categoryId) {
        this.fetchCategoryData(this.categoryId); // Call the API if 'id' is present
      }
    });
  }

  // Function to call the API with the category id
  fetchCategoryData(categoryId: string): void {
    const url = `https://rigidjersey.com/backend-api/api/get_catalog_image.php/?category_id=${categoryId}`;
    
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.categoryData = response.data; // Store the fetched data
        } else {
          console.error('Failed to fetch category data');
        }
      },
      (error) => {
        console.error('Error fetching category data:', error);
      }
    );
  }
  convertImageUrl(imagePath: string): string {
    const baseUrl1 = 'https://rigidjersey.com/backend-api';
    return baseUrl1 + imagePath.replace('..', ''); // Adjust the relative path to an absolute URL
  }
  navigateToProductDetails(product:any){
    this.router.navigate(['/details-catalog'], { queryParams: { id: product.id } });
  }
  goBack() {
    this.location.back(); // This will navigate back in the browser history
  }
}