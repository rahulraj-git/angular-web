import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent {
  username: string = '';
  password: string = '';
  categoryList: any;
  constructor(private router: Router, private http: HttpClient){

  }
  ngOnInit() {
    this.getCategory();
  }
  getCategory() {

    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php').subscribe((response: any) => {
      if (response.success) {
        this.categoryList=response.data
        // Redirect to the admin dashboard if login is successful
        // this.router.navigate(['/admin-dashboard']);
      } else {
        // Handle unsuccessful login here, like showing an error message
        alert('list category failed.');
      }
    }, error => {
      // Handle HTTP errors
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    });
  }
  convertImageUrl(relativeUrl: string): string {
    return `https://rigidjersey.com/backend-api/${relativeUrl.replace(/^(\.\.\/)+/, '')}`;
  }
}
