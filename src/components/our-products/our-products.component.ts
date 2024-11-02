import { Component } from '@angular/core';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent {
  changeImage(hoverImage: string) {
    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach((img:any) => {
      if (img.src.includes(hoverImage)) {
        img.src = hoverImage;
      }
    });
  }

  resetImage() {
    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach((img:any) => {
      img.src = img.src.replace('-hover', '');
    });
  }
}