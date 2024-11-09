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

  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;
  @ViewChild('categoryImageInput') categoryImageInput!: ElementRef;
  @ViewChild('imageFileInput') imageFileInput!: ElementRef;
  @ViewChild('csvFileInput') csvFileInput!: ElementRef;


  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

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
      console.log('Catalog data:', { name, code, description });
      console.log('Catalog image file:', this.selectedFiles.catalogImage);
      this.uploadMessage = 'Catalog submission completed.';
      this.resetFields();  // Clear file inputs
    } else {
      this.uploadMessage = 'Please complete all catalog fields.';
    }
  }

  onImageBulkUploadSubmit(event: Event) {
    event.preventDefault(); // Prevent page refresh
    const categoryName = this.categoryNameInput.nativeElement.value;

    if (this.selectedFiles.imageBulkUpload && this.selectedFiles.dataCsvUpload && categoryName) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('catalog_zip', this.selectedFiles.imageBulkUpload);
      formData.append('catalog_category', categoryName);
      formData.append('catalog_csv', this.selectedFiles.dataCsvUpload);

      const headers = new HttpHeaders();

      this.http.post('https://rigidjersey.com/backend-api/api/upload_catalogs.php', formData, { headers, responseType: 'text' })
        .subscribe(
          (response: string) => {
            console.log('Image bulk upload response:', response);
            this.uploadMessage = response;
            // Show a success message
            this.snackBar.open('Successfully inserted data', 'Close', {
              duration: 3000, // Adjust duration as needed
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });

            this.resetFields();  // Clear all input fields and file selections
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
    this.imageFileInput.nativeElement.value = '';
    this.csvFileInput.nativeElement.value = '';
    this.categoryNameInput.nativeElement.value = '';
    this.categoryImageInput.nativeElement.value = ''; 
  }
  onAddCategorySubmit(name: string, description: string, image: File | null) {
    if (name && description && image) {
      const formData = new FormData();
      formData.append('category_name', name);
      formData.append('description', description);
      formData.append('image', image);
  
      const headers = new HttpHeaders();
  
      this.isLoading = true;
  
      this.http.post('https://rigidjersey.com/backend-api/api/create_category.php', formData, { headers, responseType: 'text' })
        .subscribe(
          (response: string) => {
            console.log('Category created successfully:', response);
            this.uploadMessage = 'Category submitted successfully.';
            
            // Show a success message
            this.snackBar.open('Category created successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
  
            this.resetFields();  // Reset form fields
          },
          (error: HttpErrorResponse) => {
            console.error('Error during category creation:', error);
            this.uploadMessage = 'Error during category creation. Please try again.';
            
            // Show error message
            this.snackBar.open('Error creating category!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
        ).add(() => {
          this.isLoading = false;
        });
    } else {
      this.uploadMessage = 'Please provide all required fields: name, description, and image.';
    }
  }



}