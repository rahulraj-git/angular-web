import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  menuActive = false;

  openWhatsAppChat() {
    const phoneNumber = '+918073877920'; // Replace with your WhatsApp number
    const message = 'Hello! I would like to know more about your services.'; // Customize your default message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  // toggleMenu() {
  //   this.menuActive = !this.menuActive;
  //   const navLinks = document.querySelector('.nav-links');
  //   if (navLinks) {
  //     navLinks.classList.toggle('active', this.menuActive);
  //   }
  // }
  // Method to scroll to a section
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100; // Adjust this value to control the portion to hide
      const elementPosition = section.offsetTop;
      const scrollPosition = elementPosition - offset;
  
      // Use requestAnimationFrame for smoother, one-time scroll execution
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      });
    }
  }

  // Logic for toggling burger menu (for mobile responsiveness)
  toggleMenu(): void {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  }
}