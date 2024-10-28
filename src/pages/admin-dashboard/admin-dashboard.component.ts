import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  catalog = { name: '', code: '', description: '' }; // Ensure all fields are string type
  selectedFiles :any = {
    imageBulkUpload: null as File | null,
    dataBulkUpload: null as File | null,
    catalogImage: null as File | null
  };

  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'imageBulkUpload' && file.type !== 'application/zip') {
      alert('Please upload a .zip file for bulk image upload');
      return;
    }
    this.selectedFiles[type] = file;
  }

  isFileSelected(type: string): boolean {
    return !!this.selectedFiles[type];
  }

  onImageBulkUploadSubmit() {
    if (this.selectedFiles.imageBulkUpload) {
      // Handle image bulk upload here
      console.log('Image bulk upload file:', this.selectedFiles.imageBulkUpload);
    }
  }

  onDataBulkUploadSubmit() {
    if (this.selectedFiles.dataBulkUpload) {
      // Handle data bulk upload here
      console.log('Data bulk upload file:', this.selectedFiles.dataBulkUpload);
    }
  }

  onCatalogSubmit() {
    if (this.catalog.name && this.catalog.code && this.catalog.description && this.selectedFiles.catalogImage) {
      // Handle single catalog submission here
      console.log('Catalog data:', this.catalog);
      console.log('Catalog image file:', this.selectedFiles.catalogImage);
    }
  }
}