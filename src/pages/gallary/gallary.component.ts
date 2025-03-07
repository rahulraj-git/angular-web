import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
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
  @Input() backbtn: any;
  galleryImages: any; // Array to hold gallery images
  apiUrl: string = 'https://rigidjersey.com/backend-api/api/get_gallery.php'; // API endpoint for getting gallery images
  selectedImage: string | null = null;
  zoomLevel: number = 1;
  isHomeView: boolean = false;
  currentImageIndex: number = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.fetchGalleryImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Set isHomeView based on backbtn value
    this.isHomeView = !this.backbtn;
  }

  goBack() {
    this.navigateBack.emit('backToParent');
    
    // Navigate to home
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const galleryElement = document.getElementById('gallery');
        if (galleryElement) {
          const offset = 70; // Adjust this value based on your navbar height
          const elementPosition = galleryElement.offsetTop;
          const scrollPosition = elementPosition - offset;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Increased timeout to ensure DOM is fully loaded
    });

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'gallery_back_button_clicked', {
        event_category: 'Navigation',
        event_label: 'Gallery Back Button'
      });
    }
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

  openImagePopup(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.currentImageIndex = this.galleryImages.findIndex((img: any) => img.image_url === imageUrl);
    this.zoomLevel = 1;
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_popup_opened', {
        event_category: 'Gallery',
        event_label: imageUrl
      });
    }
  }

  closeImagePopup() {
    this.selectedImage = null;
    this.zoomLevel = 1;
  }

  zoomIn() {
    if (this.zoomLevel < 3) { // Maximum zoom level
      this.zoomLevel += 0.2;
    }
  }

  zoomOut() {
    if (this.zoomLevel > 0.5) { // Minimum zoom level
      this.zoomLevel -= 0.2;
    }
  }

  // Add keyboard event listener
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedImage) {
      switch (event.key) {
        case 'ArrowLeft':
          this.showPreviousImage();
          break;
        case 'ArrowRight':
          this.showNextImage();
          break;
        case 'Escape':
          this.closeImagePopup();
          break;
      }
    }
  }

  showNextImage() {
    if (this.galleryImages && this.galleryImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
      this.selectedImage = this.galleryImages[this.currentImageIndex].image_url;
      this.zoomLevel = 1; // Reset zoom level
    }
  }

  showPreviousImage() {
    if (this.galleryImages && this.galleryImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
      this.selectedImage = this.galleryImages[this.currentImageIndex].image_url;
      this.zoomLevel = 1; // Reset zoom level
    }
  }

  // Add touch handling
  touchStartX: number = 0;
  touchEndX: number = 0;

  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  handleTouchEnd() {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.showPreviousImage();
      } else {
        this.showNextImage();
      }
    }
  }
}