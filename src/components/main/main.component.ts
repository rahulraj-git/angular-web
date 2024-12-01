import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  openWhatsAppChat() {
    const phoneNumber = '8073877920'; // Replace with your WhatsApp number
    const message = 'Hello! I would like to know more about your services.'; // Customize your default message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
  }
}