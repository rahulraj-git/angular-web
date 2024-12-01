import { Component } from '@angular/core';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent {
  // Method to open the rating link in a new tab
  openRatingPage() {
    window.open('https://maps.app.goo.gl/am9EkW7ZMx3GrWww6', '_blank');
  }
}
