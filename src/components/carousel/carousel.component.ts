import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  private carouselInstance: any;
  private readonly INTERVAL_TIME = 3000; // Constant for interval time

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const carouselElement = document.getElementById('carouselExample');
      
      if (carouselElement) {
        // Initialize carousel with options
        this.carouselInstance = new bootstrap.Carousel(carouselElement, {
          interval: this.INTERVAL_TIME,
          wrap: true,      // Enable continuous cycling
          touch: true,     // Enable touch support
          keyboard: true,   // Enable keyboard control
          pause: false     // Disable pause on hover
        });

        // Force start the carousel
        this.startCarousel();

        // Add only mousedown/up events to carousel images
        const carouselImages = carouselElement.querySelectorAll('.carousel-item img, .carousel-item picture');
        carouselImages.forEach(image => {
          image.addEventListener('mousedown', () => this.pauseCarousel());
          image.addEventListener('mouseup', () => this.restartCarousel());
        });

        // Select the first active caption on load and add the fade-up class
        const firstActiveCaption = carouselElement.querySelector('.carousel-item.active .carousel-caption');
        if (firstActiveCaption) {
          firstActiveCaption.classList.add('fade-up');
        }

        carouselElement.addEventListener('slide.bs.carousel', () => {
          const captions = carouselElement.querySelectorAll('.carousel-caption');
          
          // Remove the fade-up class from all captions
          captions.forEach(caption => caption.classList.remove('fade-up'));
        });

        carouselElement.addEventListener('slid.bs.carousel', () => {
          const activeCaption = carouselElement.querySelector('.carousel-item.active .carousel-caption');
          
          // Add fade-up class to the active caption after sliding
          if (activeCaption) {
            setTimeout(() => {
              activeCaption.classList.add('fade-up');
            }, 500); // Adjust delay to sync with transition
          }
        });
      }
    }
  }

  pauseCarousel() {
    if (this.carouselInstance) {
      this.carouselInstance.pause();
    }
  }

  startCarousel() {
    if (this.carouselInstance) {
      this.carouselInstance.cycle();
    }
  }

  restartCarousel() {
    if (this.carouselInstance) {
      this.carouselInstance.pause();  // First pause to reset any existing interval
      setTimeout(() => {
        this.carouselInstance.cycle(); // Then restart with fresh interval
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.carouselInstance) {
      this.carouselInstance.dispose();
    }
  }
}