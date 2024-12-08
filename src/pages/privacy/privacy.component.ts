import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  ngOnInit(): void {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }

}
