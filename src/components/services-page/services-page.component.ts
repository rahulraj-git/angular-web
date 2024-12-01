import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent {
  username: string = '';
  password: string = '';
  categoryList = [
    {
      id: 1,
      name: 'Sublimation',
      description: 'A printing technique that uses heat to transfer dye onto materials like fabric, creating vibrant, long-lasting designs.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 2,
      name: 'Screen print',
      description: 'A traditional printing method where ink is applied through a mesh screen to create bold, durable designs on various surfaces.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 3,
      name: 'Embroidery',
      description: 'The art of stitching designs onto fabric using thread, offering a high-quality, textured finish for logos and artwork.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 4,
      name: 'DTF (Direct-to-Film)',
      description: 'A printing method that transfers designs directly from a film onto fabric, offering vibrant colors and long-lasting prints.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
  ];
  constructor(private router: Router, private http: HttpClient){

  }
  ngOnInit() {
    // this.getCategory();
  }

  convertImageUrl(relativeUrl: string): string {
    return `https://rigidjersey.com/backend-api/${relativeUrl.replace(/^(\.\.\/)+/, '')}`;
  }
  ngAfterViewInit() {
    this.observeSectionVisibility();
  }

  observeSectionVisibility() {
    const section = document.querySelector('.categories-grid');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section?.classList.add('visible'); // Add visible class to show the section
        } else {
          section?.classList.remove('visible'); // Remove it if not visible
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the section is visible
    });

    observer.observe(section!); // Start observing the section
  }
  onLearnMoreClick(category: any) {
      const phoneNumber = '+918073877920'; // Replace with your WhatsApp number
      const message = `Hello! I would like to know more about ${category.name} services.`; // Customize your default message
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    }
  
}
