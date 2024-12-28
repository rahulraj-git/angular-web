import { Component } from '@angular/core';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent {
  galleryImages = [
    'assets/banner1.jpg',
    'assets/banner2.jpg',
    'assets/banner3.jpg',
    'assets/banner1.jpg',
    'assets/banner2.jpg',
    'assets/banner3.jpg',
    'assets/banner1.jpg',
    'assets/banner2.jpg',
    'assets/banner3.jpg',
    'assets/banner1.jpg',
    'assets/banner2.jpg',
    'assets/banner3.jpg',

    // Add more image paths here
  ];
}
