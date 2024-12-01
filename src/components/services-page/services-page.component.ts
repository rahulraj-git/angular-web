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
      name: 'Football',
      description: 'Experience the thrill of the world’s most popular sport.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 2,
      name: 'Basketball',
      description: 'Reach new heights with the dynamic game of basketball.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 3,
      name: 'Tennis',
      description: 'Feel the power of a smashing ace in tennis.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 4,
      name: 'Swimming',
      description: 'Dive into the refreshing world of competitive swimming.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    },
    {
      id: 5,
      name: 'Cricket',
      description: 'Hit boundaries with the gentleman’s game of cricket.',
      image_url: 'https://rigidjersey.com/backend-api/uploads/category/catdata.jpg'
    }
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
    const section = document.querySelector('.categories-section');
    
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
      const phoneNumber = '1234567890'; // Replace with your WhatsApp number
      const message = `Hello! I would like to know more about ${category.name} services.`; // Customize your default message
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    }
  
}
