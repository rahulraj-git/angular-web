import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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

  // Access category input and file inputs
  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;
  @ViewChild('imageFileInput') imageFileInput!: ElementRef;
  @ViewChild('csvFileInput') csvFileInput!: ElementRef;

  constructor(private http: HttpClient) {}

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

      // Set responseType to 'text' to handle non-JSON responses
      this.http.post('https://rigidjersey.com/backend-api/api/upload_catalogs.php', formData, { headers, responseType: 'text' })
        .subscribe(
          (response: string) => {
            console.log('Image bulk upload response:', response);
            this.uploadMessage = response;
            this.resetFields();  // Clear all input fields and file selections
          },
          (error: HttpErrorResponse) => {
            console.error('Error during image bulk upload:', error);
            if (error.error instanceof SyntaxError) {
              this.uploadMessage = 'Parsing error in response. Please check the server response format.';
            } else {
              this.uploadMessage = 'Error during image bulk upload. Please try again.';
            }
          }
        ).add(() => {
          this.isLoading = false;
        });
    } else {
      this.uploadMessage = 'Please select all required files and provide a category name.';
    }
  }

  private resetFields() {
    // Clear selected files
    this.selectedFiles = {
      imageBulkUpload: null,
      dataCsvUpload: null,
      dataBulkUpload: null,
      catalogImage: null
    };
    
    // Clear file inputs and category name input
    this.categoryNameInput.nativeElement.value = '';
    this.imageFileInput.nativeElement.value = '';
    this.csvFileInput.nativeElement.value = '';
  }
}