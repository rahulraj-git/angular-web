import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  selectedFiles: any = {
    imageBulkUpload: null as File | null,
    dataCsvUpload: null as File | null,
    dataBulkUpload: null as File | null,
    catalogImage: null as File | null
  };

  uploadMessage: string | null = null;
  isLoading: boolean = false;
  categories: any[] = [];
  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;
  @ViewChild('categoryInput') categoryInput!: ElementRef;
  @ViewChild('categoryImageInput') categoryImageInput!: ElementRef;
  @ViewChild('imageFileInput') imageFileInput!: ElementRef;
  @ViewChild('csvFileInput') csvFileInput!: ElementRef;
  @ViewChild('categoryDescriptionInput') categoryDescriptionInput!: ElementRef;
  

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  ngOnInit() {
    // Fetch categories when the component initializes
    this.fetchCategories();
  }
  fetchCategories() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php').subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
        } else {
          this.snackBar.open('Failed to fetch categories', 'Close', { duration: 3000 });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Error fetching categories', 'Close', { duration: 3000 });
      }
    );
  }
  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'imageBulkUpload' && file.type !== 'application/zip') {
      alert('Please upload a .zip file for bulk image upload');
      return;
    } else if (type === 'dataCsvUpload' && file.type !== 'text/csv') {
      alert('Please upload a .csv file for data upload');
      return;
    }
    this.selectedFiles[type] = file;
  }

  isFileSelected(type: string): boolean {
    return !!this.selectedFiles[type];
  }

  onCatalogSubmit(name: string, code: string, description: string) {
    if (name && code && description && this.selectedFiles.catalogImage) {
      const formData = new FormData();
      formData.append('catalog_name', name);
      formData.append('catalog_code', code);
      formData.append('catalog_description', description);
      formData.append('catalog_image', this.selectedFiles.catalogImage);

      const headers = new HttpHeaders();

      this.isLoading = true;

      this.http.post('https://rigidjersey.com/backend-api/api/create_catalog.php', formData, { headers, responseType: 'text' })
        .subscribe(
          (response: string) => {
            console.log('Catalog created successfully:', response);
            this.uploadMessage = 'Catalog submission completed.';
            this.snackBar.open('Catalog created successfully!', 'Close', { duration: 3000 });
            this.resetFields();
          },
          (error: HttpErrorResponse) => {
            console.error('Error during catalog creation:', error);
            this.uploadMessage = 'Error during catalog creation. Please try again.';
            this.snackBar.open('Error creating catalog!', 'Close', { duration: 3000 });
          }
        ).add(() => {
          this.isLoading = false;
        });
    } else {
      this.uploadMessage = 'Please provide all required fields: name, code, description, and image.';
    }
  }

  onImageBulkUploadSubmit(event: Event) {
    event.preventDefault(); 
    const categoryName = this.categoryInput.nativeElement.value;

    if (this.selectedFiles.imageBulkUpload && this.selectedFiles.dataCsvUpload && categoryName) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('zip_file', this.selectedFiles.imageBulkUpload);
      formData.append('category_name', categoryName);
      formData.append('csv_file', this.selectedFiles.dataCsvUpload);

      const headers = new HttpHeaders();

      this.http.post('https://rigidjersey.com/backend-api/api/upload_catalogs.php', formData)
        .subscribe(
          (response: any) => {
            console.log('Image bulk upload response:', response);
            this.uploadMessage = response;
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
            this.resetFields();
          },
          (error: HttpErrorResponse) => {
            console.error('Error during image bulk upload:', error);
            this.uploadMessage = error.error instanceof SyntaxError ? 
              'Parsing error in response. Please check the server response format.' : 
              'Error during image bulk upload. Please try again.';
          }
        ).add(() => {
          this.isLoading = false;
        });
    } else {
      this.uploadMessage = 'Please select all required files and provide a category name.';
    }


    
  }

  private resetFields() {
    this.selectedFiles = {
      imageBulkUpload: null,
      dataCsvUpload: null,
      dataBulkUpload: null,
      catalogImage: null
    };
    this.categoryNameInput.nativeElement.value = '';
    this.categoryDescriptionInput.nativeElement.value = '';
    this.categoryImageInput.nativeElement.value = '';
  }
  onAddCategorySubmit(name: string, description: string, image: File | null, event: Event) {
    event.preventDefault();  // Prevent form from refreshing the page
    console.log('onAddCategorySubmit called');
    if (name && description && image) {
      const formData = new FormData();
      formData.append('category_name', name);
      formData.append('description', description);
      formData.append('image', image);
  
      console.log('Sending request to backend...');
      this.isLoading = true;
  
      this.http.post('https://rigidjersey.com/backend-api/api/create_category.php', formData).subscribe(
        response => {
          console.log('Category added successfully:', response);
          this.uploadMessage = 'Category added successfully!';
          this.snackBar.open('Category added!', 'Close', { duration: 3000 });
          this.resetFields();
        },
        (error: HttpErrorResponse) => {
          console.error('Error during category addition:', error);
          this.uploadMessage = 'Error adding category. Please try again.';
        }
      ).add(() => {
        this.isLoading = false;
      });
    } else {
      this.uploadMessage = 'Please provide all required fields: category name, description, and image.';
    }
  }
}
