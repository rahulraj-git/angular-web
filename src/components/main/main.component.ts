import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  menuActive: boolean = false;
  isDropdownOpen: boolean = false;
  isScrolled: boolean = false;
  navbarOpacity: number = 1; // Initial opacity
  section: any='other';

  // Detect scroll to apply styles dynamically
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const maxScroll = 300; // Adjust this value as needed

    // Set opacity based on scroll position (value between 1 and 0)
    this.navbarOpacity = Math.max(1 - scrollTop / maxScroll, 0.5);

    // Check if navbar should be in scrolled state
    this.isScrolled = scrollTop > 50; // Set threshold
  }

  // Smooth scroll to sections
  navigateTo(sectionId: string): void {
    this.isDropdownOpen = false;
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownContent) {
      if (this.isDropdownOpen) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust offset as needed
      const elementPosition = section.offsetTop;
      const scrollPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });

      // Close menu or dropdown after navigation (for mobile)
      this.menuActive = false;
      this.isDropdownOpen = false;
   
    }
       this.section='other'
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownContent) {
      if (this.isDropdownOpen) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }

  }

  // Toggle the main menu for mobile devices
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  // Open WhatsApp chat in a new tab
  openWhatsAppChat(): void {
    const phoneNumber = '+918073877920'; // Replace with your WhatsApp number
    const message = 'Hello! I would like to know more about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
  sectionChange(sectionName: any) {
    this.section = sectionName
    this.menuActive = false;
    this.isDropdownOpen = false;
  }
  handleNavigateBack(event: string) {
    console.log('Received from child:', event);
    // Example: Change the section based on the emitted value
    if (event === 'backToParent') {
      this.section = 'other';
    }
  }
}