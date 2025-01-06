import { Component } from '@angular/core';

declare var gtag: any;

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent {
  // Method to open the rating link in a new tab
  openRatingPage() {
    const ratingUrl = 'https://maps.app.goo.gl/am9EkW7ZMx3GrWww6';

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'rating_page_opened', {
        event_category: 'Engagement',
        event_label: 'Google Maps Rating',
        value: ratingUrl
      });
    }

    window.open(ratingUrl, '_blank');
  }
}
