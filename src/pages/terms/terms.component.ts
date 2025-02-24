import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
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
          const offset = 70;
          const elementPosition = footerElement.offsetTop;
          const scrollPosition = elementPosition - offset;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    });
  }
}
