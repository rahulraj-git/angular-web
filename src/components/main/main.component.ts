import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var gtag: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // Detect scroll to apply styles dynamically
  menuActive: boolean = false;
  isDropdownOpen: boolean = false;
  isScrolled: boolean = false;
  navbarOpacity: number = 1; // Initial opacity
  section: any = 'other';
  isDropdownOpenTeam: boolean = false;
  teamList: any;
  isDropdownOpenAcc: boolean = false;
  accList: any;
  isHovered = false;
  showScrollToTop: boolean = false; // Flag to show/hide the scroll-to-top button

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const maxScroll = 300; // Adjust this value as needed

    // Set opacity based on scroll position (value between 1 and 0)
    this.navbarOpacity = Math.max(1 - scrollTop / maxScroll, 0.5);

    // Check if navbar should be in scrolled state
    this.isScrolled = scrollTop > 50; // Set threshold

    // Show/hide scroll-to-top button based on scroll position
    const scrollHeight = document.documentElement.scrollHeight;
    this.showScrollToTop = scrollTop > (scrollHeight * 0.2); // Show button when scrolled 20% of the site
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
  
    // Check if the click is outside the menu and dropdowns
  
  
    console.log('Clicked element:', targetElement);
    // console.log('Is click outside menu:', isClickOutsideMenu);
  
    if (targetElement.className!== 'dropbtn' ) {
      this.closeAllMenus();
    }
    if(targetElement.className !== 'dropbtn' && targetElement.className !== 'line'){
    this.menuActive = false;
      this.closeAllMenus();
    }
  }
  
  // Utility method to close all menus
  closeAllMenus(): void {
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;
    this.isDropdownOpenAcc = false;
  
    // Close dropdowns
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownContent2 = document.querySelector('.dropdown-content-team');
    const dropdownContent3 = document.querySelector('.dropdown-content-acc');
  
    if (dropdownContent) dropdownContent.classList.remove('show');
    if (dropdownContent2) dropdownContent2.classList.remove('show');
    if (dropdownContent3) dropdownContent3.classList.remove('show');
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.navigateTo(fragment);
      }
    });
  }

  // Smooth scroll to sections
  navigateTo(sectionId: any): void {
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;
    this.isDropdownOpenAcc = false;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownContent2 = document.querySelector('.dropdown-content-team');
    const dropdownContent3 = document.querySelector('.dropdown-content-acc');
    if (dropdownContent3) {
      if (this.isDropdownOpenAcc) {
        dropdownContent3.classList.add('show');
      } else {
        dropdownContent3.classList.remove('show');
      }
    }
    if (dropdownContent) {
      if (this.isDropdownOpen) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }
    if (dropdownContent2) {
      if (this.isDropdownOpen) {
        dropdownContent2.classList.add('show');
      } else {
        dropdownContent2.classList.remove('show');
      }
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 70; // Adjust offset as per your navbar height
        const elementPosition = section.offsetTop;
        const scrollPosition = elementPosition - offset;

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }, 100);

    this.menuActive = false;
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;

    this.section = 'other';

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', `navigate_to_${sectionId}`, {
        event_category: 'Navigation',
        event_label: sectionId
      });
    }
  }

  navigateToTeam(sectionId: string): void {
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;
    const dropdownContent = document.querySelector('.dropdown-content-team');
    const dropdownContent2 = document.querySelector('.dropdown-content');

    if (dropdownContent) {
      if (this.isDropdownOpenTeam) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }
    if (dropdownContent2) {
      if (this.isDropdownOpen) {
        dropdownContent2.classList.add('show');
      } else {
        dropdownContent2.classList.remove('show');
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
      this.isDropdownOpenTeam = false;
      this.isDropdownOpenAcc = false;

      // Google Analytics tracking code
      if (typeof gtag !== 'undefined') {
        gtag('event', `navigate_to_team_${sectionId}`, {
          event_category: 'Navigation',
          event_label: sectionId
        });
      }
    }
    this.section = 'other';
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isDropdownOpenTeam = false;
    this.isDropdownOpenAcc = false;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownContent2 = document.querySelector('.dropdown-content-team');
    const dropdownContent3 = document.querySelector('.dropdown-content-acc');
    if (dropdownContent2) {
      if (this.isDropdownOpenTeam) {
        dropdownContent2.classList.add('show');
      } else {
        dropdownContent2.classList.remove('show');
      }
    }
    if (dropdownContent3) {
      if (this.isDropdownOpenTeam) {
        dropdownContent3.classList.add('show');
      } else {
        dropdownContent3.classList.remove('show');
      }
    }

    if (dropdownContent) {
      if (this.isDropdownOpen) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'toggle_dropdown', {
        event_category: 'Navigation',
        event_label: 'Dropdown'
      });
    }
  }

  toggleDropdownforTeam(): void {
    this.isDropdownOpenTeam = !this.isDropdownOpenTeam;
    this.isDropdownOpenAcc = false;
    this.isDropdownOpen = false;
    const dropdownContent = document.querySelector('.dropdown-content-team');
    const dropdownContent2 = document.querySelector('.dropdown-content');
    const dropdownContent3 = document.querySelector('.dropdown-content-acc');
    if (dropdownContent2) {
      if (this.isDropdownOpen) {
        dropdownContent2.classList.add('show');
      } else {
        dropdownContent2.classList.remove('show');
      }
    }
    if (dropdownContent3) {
      if (this.isDropdownOpen) {
        dropdownContent3.classList.add('show');
      } else {
        dropdownContent3.classList.remove('show');
      }
    }
    if (dropdownContent) {
      if (this.isDropdownOpenTeam) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'toggle_dropdown_team', {
        event_category: 'Navigation',
        event_label: 'Dropdown Team'
      });
    }
  }

  toggleDropdownforAcc(): void {
    this.isDropdownOpenAcc = !this.isDropdownOpenAcc;
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;
    const dropdownContent = document.querySelector('.dropdown-content-acc');
    const dropdownContent2 = document.querySelector('.dropdown-content-team');
    const dropdownContent3 = document.querySelector('.dropdown-content');
    if (dropdownContent2) {
      if (this.isDropdownOpenTeam) {
        dropdownContent2.classList.add('show');
      } else {
        dropdownContent2.classList.remove('show');
      }
    }
    if (dropdownContent3) {
      if (this.isDropdownOpen) {
        dropdownContent3.classList.add('show');
      } else {
        dropdownContent3.classList.remove('show');
      }
    }
    if (dropdownContent) {
      if (this.isDropdownOpenAcc) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'toggle_dropdown_acc', {
        event_category: 'Navigation',
        event_label: 'Dropdown Accessories'
      });
    }
  }

  // Toggle the main menu for mobile devices
  toggleMenu(): void {
    this.menuActive = !this.menuActive;

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'toggle_menu', {
        event_category: 'Navigation',
        event_label: 'Menu'
      });
    }
  }

  // Open WhatsApp chat in a new tab
  openWhatsAppChat(): void {
    const phoneNumber = '+918073877920'; // Replace with your WhatsApp number
    const message = 'Hello! I would like to know more about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_chat_opened', {
        event_category: 'Engagement',
        event_label: 'WhatsApp Chat',
        value: phoneNumber
      });
    }
  }

  sectionChange(sectionName: any) {
    this.section = sectionName;
    this.menuActive = false;
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false;
    this.isDropdownOpenAcc = false;

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', `${sectionName}_section_viewed`, {
        event_category: 'Navigation',
        event_label: sectionName
      });
    }
  }

  handleNavigateBack(event: string) {
    console.log('Received from child:', event);
    // Example: Change the section based on the emitted value
    if (event === 'backToParent') {
      this.section = 'other';

      // Google Analytics tracking code
      if (typeof gtag !== 'undefined') {
        gtag('event', 'navigate_back_to_parent', {
          event_category: 'Navigation',
          event_label: 'Back to Parent'
        });
      }
    }
  }

  getCategory() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=2').subscribe(
      (response: any) => {
        if (response.success) {
          this.teamList = response.data;
        } else {
          alert('Failed to load categories.');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('An error occurred. Please try again.');
      }
    );
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=3').subscribe(
      (response: any) => {
        if (response.success) {
          this.accList = response.data;
        } else {
          alert('Failed to load categories.');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  // Navigate to the category details page
  onTypeClick(category: any) {
    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', `${category.name}_category_viewed`, {
        event_category: 'Category',
        event_label: category.name,
        value: category.id
      });
    }

    this.router.navigate(['/details-category'], { queryParams: { id: category.id } });
  }

  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Google Analytics tracking code
    if (typeof gtag !== 'undefined') {
      gtag('event', 'scroll_to_top_clicked', {
        event_category: 'Navigation',
        event_label: 'Scroll to Top'
      });
    }
  }
}