import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }

  goBack() {
    // Navigate to home
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
          const offset = 70; // Adjust this value based on your navbar height
          const elementPosition = footerElement.offsetTop;
          const scrollPosition = elementPosition - offset;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Timeout to ensure DOM is loaded
    });
  }
}
