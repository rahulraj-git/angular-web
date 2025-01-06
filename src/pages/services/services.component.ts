import { Component, EventEmitter, Output } from '@angular/core';

declare var gtag: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  @Output() navigateBack = new EventEmitter<string>();

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack() {
    // Emit a value when this method is called
    this.navigateBack.emit('backToParent');

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'services_back_button_clicked', {
        event_category: 'Navigation',
        event_label: 'Services Back Button'
      });
    }
  }
}
