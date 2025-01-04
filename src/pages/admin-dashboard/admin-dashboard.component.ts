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
    catalogImage: null as File | null,
    laptopImage: null as File | null,
    tabletImage: null as File | null,
    phoneImage: null as File | null
  };
  priorityValue: number | null = null; // Holds the priority input value
  uniqueCodeValue: string = '';
  uploadMessage: string | null = null;
  isLoading: boolean = false;
  categories: any[] = [];
  selectedBannerIndex: number | null = null;
  cacheBuster: number = Date.now(); // Cache-busting timestamp
  @ViewChild('categoryNameInput') categoryNameInput!: ElementRef;
  @ViewChild('categoryInput') categoryInput!: ElementRef;
  @ViewChild('typeInput') typeInput!: ElementRef;
  @ViewChild('categoryImageInput') categoryImageInput!: ElementRef;
  @ViewChild('imageFileInput') imageFileInput!: ElementRef;
  @ViewChild('csvFileInput') csvFileInput!: ElementRef;
  @ViewChild('categoryDescriptionInput') categoryDescriptionInput!: ElementRef;
  @ViewChild('galleryImageInput') galleryImageInput!: ElementRef;
  @ViewChild('bannerIndexInput') bannerIndexInput!: ElementRef;
  @ViewChild('laptopImageInput') laptopImageInput!: ElementRef;
  @ViewChild('tabletImageInput') tabletImageInput!: ElementRef;
  @ViewChild('phoneImageInput') phoneImageInput!: ElementRef;
  types: any;
  selectedType: any;
  categories2: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  ngOnInit() {
    // Fetch categories when the component initializes
    this.fetchCategories();
    this.fetchTypes();
  }
  fetchCategories() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php').subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
        } else {
          this.snackBar.open('Failed to fetch categories', 'Close', { duration: 3000, // 3 seconds
            horizontalPosition: 'center', // To center it horizontally
            verticalPosition: 'top', 
            panelClass: ['custom-snack-bar'] });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Error fetching categories', 'Close', { duration: 3000, // 3 seconds
          horizontalPosition: 'center', // To center it horizontally
          verticalPosition: 'top', 
          panelClass: ['custom-snack-bar'] });
      }
    );
  }
  fetchTypes() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category_types.php').subscribe(
      (response: any) => {
        if (response.success) {
          this.types = response.data;
        } else {
          this.snackBar.open('Failed to fetch categories', 'Close', { duration: 3000, // 3 seconds
            horizontalPosition: 'center', // To center it horizontally
            verticalPosition: 'top', 
            panelClass: ['custom-snack-bar'] });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Error fetching categories', 'Close', { duration: 3000, // 3 seconds
          horizontalPosition: 'center', // To center it horizontally
          verticalPosition: 'top', 
          panelClass: ['custom-snack-bar'] });
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
            this.snackBar.open('Catalog created successfully!', 'Close', { duration: 3000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar']});
            this.resetFields();
          },
          (error: HttpErrorResponse) => {
            console.error('Error during catalog creation:', error);
            this.uploadMessage = 'Error during catalog creation. Please try again.';
            this.snackBar.open('Error creating catalog!', 'Close', { duration: 3000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar'] });
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
            this.snackBar.open(response.message, 'Close', { duration: 3000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar'] });
            this.resetFields();
          },
          (error: HttpErrorResponse) => {
            console.error('Error during image bulk upload:', error);
            this.snackBar.open(error.error.error, 'Close', { duration: 5000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar'] });
            this.uploadMessage = error.error instanceof SyntaxError ? 
              'Parsing error in response. Please check the server response format.' : 
              'Error during image bulk upload. Please try again.';
          }
        ).add(() => {
          this.isLoading = false;
        });
    } else {
      this.uploadMessage = 'Please select all required files and provide a category name.';
      this.snackBar.open('please fill all the fields', 'Close', { duration: 3000, // 3 seconds
        horizontalPosition: 'center', // To center it horizontally
        verticalPosition: 'top', 
        panelClass: ['custom-snack-bar'] });
    }


    
  }

  private resetFields() {
    this.selectedFiles = {
      imageBulkUpload: null,
      dataCsvUpload: null,
      dataBulkUpload: null,
      catalogImage: null,
      laptopImage: null,
      tabletImage: null,
      phoneImage: null
    };
    if (this.galleryImageInput)  this.galleryImageInput.nativeElement.value = '';
    if(this.typeInput) this.typeInput.nativeElement.value = '';
    if (this.categoryNameInput) this.categoryNameInput.nativeElement.value = '';
    if (this.categoryDescriptionInput) this.categoryDescriptionInput.nativeElement.value = '';
    if (this.categoryImageInput) this.categoryImageInput.nativeElement.value = '';
    if (this.imageFileInput) this.imageFileInput.nativeElement.value = '';
    if (this.csvFileInput) this.csvFileInput.nativeElement.value = '';
    if (this.bannerIndexInput) this.bannerIndexInput.nativeElement.value = '';
    if (this.laptopImageInput) this.laptopImageInput.nativeElement.value = '';
    if (this.tabletImageInput) this.tabletImageInput.nativeElement.value = '';
    if (this.phoneImageInput) this.phoneImageInput.nativeElement.value = '';
  }
  onAddCategorySubmit(name: string, description: string, image: File | null,type: string, event: Event) {
    event.preventDefault();  // Prevent form from refreshing the page
    console.log('onAddCategorySubmit called');
    if (name && description && image&&type) {
      const formData = new FormData();
      formData.append('category_name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('category_type_id', type);
  
      console.log('Sending request to backend...');
      this.isLoading = true;
  
      this.http.post('https://rigidjersey.com/backend-api/api/create_category.php', formData).subscribe(
        response => {
          console.log('Category added successfully:', response);
          this.uploadMessage = 'Category added successfully!';
          this.snackBar.open('Category added!', 'Close', { duration: 3000, // 3 seconds
            horizontalPosition: 'center', // To center it horizontally
            verticalPosition: 'top', 
            panelClass: ['custom-snack-bar'] });
            this.fetchCategories();
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
      this.snackBar.open('Please provide all required fields: category name, description, and image.', 'Close', { duration: 3000, // 3 seconds
        horizontalPosition: 'center', // To center it horizontally
        verticalPosition: 'top', 
        panelClass: ['custom-snack-bar'] });
    }
    this.resetFields();
  }
  // Method to trigger the download of subscriber data
  downloadSubscribers() {
    const url = 'https://rigidjersey.com/backend-api/api/user_data_download.php';

    // Make HTTP request to download the file
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a temporary URL for the Blob object
        const fileURL = URL.createObjectURL(data);

        // Create a temporary <a> element to trigger the download
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'subscribers_data.csv'; // Specify the file name for download
        a.click(); // Trigger the download

        // Clean up and revoke the Blob URL
        URL.revokeObjectURL(fileURL);
      },
      (error) => {
        console.error('Error downloading the file:', error);
      }
    );
  }
    // Form submission handler
    onPrioritySubmit(event: Event): void {
      event.preventDefault(); // Prevent the default form behavior
  
      const payload = {
        unique_code: this.uniqueCodeValue,
        priority: this.priorityValue,
      };
  
      // Call the API
      this.submitPriorityUpdate(payload);
    }
  
    // API call to submit priority update
    submitPriorityUpdate(payload: { unique_code: string; priority: any }): void {
      const apiUrl = 'https://rigidjersey.com/backend-api/api/create_catalog_priority.php';
  
      this.http.post(apiUrl, payload).subscribe({
        next: (response: any) => {
        this.snackBar.open(response.error?response.error:'Priority updated successfully', 'Close', { duration: 3000, // 3 seconds
          horizontalPosition: 'center', // To center it horizontally
          verticalPosition: 'top',
          panelClass: ['custom-snack-bar'] });
          this.priorityValue = null;
          this.uniqueCodeValue = '';
        },
        error: (error) => {
          console.error('API Error:', error);
          this.snackBar.open(error.error.error, 'Close', { duration: 3000, // 3 seconds
            horizontalPosition: 'center', // To center it horizontally
            verticalPosition: 'top',
            panelClass: ['custom-snack-bar'] });
        },
      });
    }
      // Method to handle file selection
  onFileSelectGallery(event: any, type: string) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      console.log('Selected file:', file);
    }
  }
    // Method to handle gallery image upload form submission
    onGalleryImageUploadSubmit(event: any) {
      event.preventDefault();  // Prevent default form submission behavior
      // Get the selected file
      const galleryImage = event.target[0].files[0];
      
      // If no image is selected, show error message
      if (!galleryImage) {
        this.snackBar.open('Please select an image to upload', 'Close', { 
          duration: 3000, 
          horizontalPosition: 'center', 
          verticalPosition: 'top',
          panelClass: ['custom-snack-bar']
        });
        return;
      }
  
      // Prepare form data for the API call
      const formData = new FormData();
      formData.append('image', galleryImage);
  
      const apiUrl = 'https://rigidjersey.com/backend-api/api/upload_customer_image.php'; // API endpoint for gallery image upload
  
      // Make the API call to upload the image
      this.http.post(apiUrl, formData).subscribe({
        next: (response: any) => {
          this.snackBar.open(response.error ? response.error : 'Gallery image uploaded successfully', 'Close', { 
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
            panelClass: ['custom-snack-bar']
          });
          
          // Reset the file input after successful upload
       this.galleryImageInput.nativeElement.value = '';
       this.resetFields();
       this.cacheBuster = Date.now(); // Update cache-busting timestamp
        },
        error: (error) => {
          console.error('API Error:', error);
          this.snackBar.open(error.error.error ? error.error.error : 'Failed to upload image. Please try again.', 'Close', { 
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
            panelClass: ['custom-snack-bar']
          });
        }
      });
    }
    onTypeChange(event: any) {
      this.selectedType = event;
      this.http.get(`https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=${this.selectedType}`).subscribe(
        (response: any) => {
          if (response.success) {
            this.categories2 = response.data;
          } else {
            this.snackBar.open('Failed to fetch categories', 'Close', { duration: 3000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar'] });
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching categories:', error);
          this.snackBar.open('Error fetching categories', 'Close', { duration: 3000, // 3 seconds
            horizontalPosition: 'center', // To center it horizontally
            verticalPosition: 'top', 
            panelClass: ['custom-snack-bar'] });
        }
      );
    }
    // Method to handle banner index change
  onBannerIndexChange(index: number) {
    this.selectedBannerIndex = index;
  }

  // Method to handle banner update form submission
  onUpdateBannerSubmit(event: Event) {
    event.preventDefault();  // Prevent default form submission behavior

    if (this.selectedBannerIndex && this.selectedFiles.laptopImage && this.selectedFiles.tabletImage && this.selectedFiles.phoneImage) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('order', this.selectedBannerIndex.toString());
      formData.append('desktop_banner', this.selectedFiles.laptopImage);
      formData.append('tablet_banner', this.selectedFiles.tabletImage);
      formData.append('mobile_banner', this.selectedFiles.phoneImage);

      const apiUrl = 'https://rigidjersey.com/backend-api/api/update_banner_image.php'; // API endpoint for banner image update

      this.http.post(apiUrl, formData).subscribe({
        next: (response: any) => {
          this.snackBar.open(response.error ? response.error : 'Banner image updated successfully', 'Close', { 
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
            panelClass: ['custom-snack-bar']
          });
          this.resetFields();
          this.cacheBuster = Date.now(); // Update cache-busting timestamp
        },
        error: (error) => {
          console.error('API Error:', error);
          this.snackBar.open(error.error.error ? error.error.error : 'Failed to update banner image. Please try again.', 'Close', { 
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
            panelClass: ['custom-snack-bar']
          });
        }
      }).add(() => {
        this.isLoading = false;
      });
    } else {
      this.snackBar.open('Please select all required images and a banner index', 'Close', { 
        duration: 3000, 
        horizontalPosition: 'center', 
        verticalPosition: 'top',
        panelClass: ['custom-snack-bar']
      });
    }
  }
}



