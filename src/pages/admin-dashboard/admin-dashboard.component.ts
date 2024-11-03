import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  onImageBulkUploadSubmit(event: Event, categoryName: string) {
    event.preventDefault();  // Prevent page refresh
    if (this.selectedFiles.imageBulkUpload && this.selectedFiles.dataCsvUpload && categoryName) {
      const formData = new FormData();
      formData.append('catalog_zip', this.selectedFiles.imageBulkUpload);
      formData.append('catalog_category', categoryName);
      formData.append('catalog_csv', this.selectedFiles.dataCsvUpload);
  
      const headers = new HttpHeaders();
  
      this.http.post('https://rigidjersey.com/backend-api/api/upload_catalogs.php', formData, { headers })
        .subscribe(
          response => console.log('Image bulk upload response:', response),
          error => console.error('Error during image bulk upload:', error)
        );
    }
  }

  onDataBulkUploadSubmit() {
    if (this.selectedFiles.dataBulkUpload) {
      console.log('Data bulk upload file:', this.selectedFiles.dataBulkUpload);
    }
  }

  onCatalogSubmit(name: string, code: string, description: string) {
    if (name && code && description && this.selectedFiles.catalogImage) {
      console.log('Catalog data:', { name, code, description });
      console.log('Catalog image file:', this.selectedFiles.catalogImage);
    }
  }
}