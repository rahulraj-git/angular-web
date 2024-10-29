import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  ngOnInit() {
    const carouselElement = document.getElementById('carouselExample');
    
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement);

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