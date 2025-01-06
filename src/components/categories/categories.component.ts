import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var gtag: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  username: string = '';
  password: string = '';
  categoryList: any[] = [];
  displayedCategories: any[] = [];  // Array to hold categories to display initially
  isViewAll: boolean = false;  // Flag to toggle between showing 6 or all categories

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=1').subscribe((response: any) => {
      if (response.success) {
        this.categoryList = response.data;
        this.limitCategories();  // Limit categories to 6 initially
      } else {
        alert('Failed to load categories.');
      }
    }, error => {
      console.error('Error fetching categories:', error);
      alert('An error occurred. Please try again.');
    });
  }

  // Limit the categories displayed initially (only show 6)
  limitCategories() {
    this.displayedCategories = this.categoryList.slice(0, 6);
  }

  // Show all categories when the "View All" button is clicked
  showAllCategories() {
    this.displayedCategories = this.categoryList;
    this.isViewAll = true;  // Change the flag to indicate all categories are shown

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_all_categories_clicked', {
        event_category: 'Category',
        event_label: 'View All Categories'
      });
    }
  }

  // Hide all categories and show only the first 6
  hideCategories() {
    this.limitCategories();
    this.isViewAll = false;  // Change the flag to indicate categories are hidden

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'hide_categories_clicked', {
        event_category: 'Category',
        event_label: 'Hide Categories'
      });
    }
  }

  // Convert image URL to the full URL
  convertImageUrl(relativeUrl: string): string {
    return `https://rigidjersey.com/backend-api/${relativeUrl.replace(/^(\.\.\/)+/, '')}`;
  }

  // Navigate to the category details page
  onCategoryClick(category: any) {
    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', `${category.name}_category_viewed`, {
        event_category: 'Category',
        event_label: category.name,
        value: category.id
      });
    }

    this.router.navigate(['/details-category'], { queryParams: { id: category.id } });
  }
}