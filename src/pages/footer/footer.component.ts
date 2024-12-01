import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  name: string = '';
  email: string = '';

  subscribe() {
    if (this.name && this.email) {
      // Handle the subscription logic here (e.g., make an API call)
      console.log('Subscribed with name:', this.name, 'and email:', this.email);
    } else {
      // Handle invalid form submission
      console.log('Please fill out both fields');
    }
  }
}
