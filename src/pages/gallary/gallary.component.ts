import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // For displaying messages

declare var gtag: any;

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {
  @Output() navigateBack = new EventEmitter<string>();
  @Input() backbtn:any; 
  galleryImages: any; // Array to hold gallery images
  apiUrl: string = 'https://rigidjersey.com/backend-api/api/get_gallery.php'; // API endpoint for getting gallery images
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}


  ngOnInit(): void {
    this.fetchGalleryImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  goBack() {
    // Emit a value when this method is called
    this.navigateBack.emit('backToParent');
    setTimeout(() => {
      this.router.navigate([], { fragment: 'gallery' });

      // Google Analytics tracking code
      if (typeof gtag !== 'undefined') {
        gtag('event', 'gallery_back_button_clicked', {
          event_category: 'Navigation',
          event_label: 'Gallery Back Button'
        });
      }
    }, 100);
  }
  fetchGalleryImages(): void {
    const baseUrl = 'https://rigidjersey.com/backend-api/'; // Base URL for images
    this.http.get<{ success: boolean, data: { id: string, image_url: string, uploaded_at: string }[] }>(this.apiUrl).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Prepend base URL to each image URL and remove the leading "../"
          this.galleryImages = response.data.map((image:any) => {
            const imageUrl = image.image_url.startsWith('../') ? image.image_url.substring(3) : image.image_url; // Remove "../" if it exists
            return {
              image_url: baseUrl + encodeURIComponent(imageUrl) // Prepend the base URL
            };
          });
  
          if (!this.galleryImages || this.galleryImages.length === 0) {
            this.snackBar.open('No gallery images found.', 'Close', { duration: 3000 });
          }
        } else {
          this.snackBar.open('Failed to fetch gallery images.', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        this.snackBar.open('Failed to load gallery images. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
}