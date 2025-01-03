import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    // Detect scroll to apply styles dynamically
  
  menuActive: boolean = false;
  isDropdownOpen: boolean = false;
  isScrolled: boolean = false;
  navbarOpacity: number = 1; // Initial opacity
  section: any='other';
  isDropdownOpenTeam: boolean = false;
  teamList: any;
  isDropdownOpenAcc: boolean = false;
  accList: any;
  isHovered = false; 

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    const maxScroll = 300; // Adjust this value as needed

    // Set opacity based on scroll position (value between 1 and 0)
    this.navbarOpacity = Math.max(1 - scrollTop / maxScroll, 0.5);

    // Check if navbar should be in scrolled state
    this.isScrolled = scrollTop > 50; // Set threshold
  }
  constructor(private router: Router,private http: HttpClient, private viewportScroller: ViewportScroller) {}
  ngOnInit(): void {
    this.getCategory();
  }
  // Smooth scroll to sections
  navigateTo(sectionId: any): void {
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false
    this.isDropdownOpenAcc = false
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownContent2 = document.querySelector('.dropdown-content-team');
    const dropdownContent3 = document.querySelector('.dropdown-content-acc');
    if (dropdownContent3) {
      if (this.isDropdownOpenAcc) {
        dropdownContent3.classList.add('show');
      }
      else {
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
   
       this.section='other'
  }
  navigateToTeam(sectionId: string): void {
    this.isDropdownOpen = false;
    this.isDropdownOpenTeam = false
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
      this.isDropdownOpenAcc = false
   
    }
       this.section='other'
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isDropdownOpenTeam = false
    this.isDropdownOpenAcc = false
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

  }
  toggleDropdownforTeam(): void {
    this.isDropdownOpenTeam = !this.isDropdownOpenTeam;
    this.isDropdownOpenAcc = false
    this.isDropdownOpen = false
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

  }
  toggleDropdownforAcc(): void {
    this.isDropdownOpenAcc = !this.isDropdownOpenAcc;
    this.isDropdownOpen = false
    this.isDropdownOpenTeam = false
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
    this.isDropdownOpenTeam = false;
    this.isDropdownOpenAcc = false
  }
  handleNavigateBack(event: string) {
    console.log('Received from child:', event);
    // Example: Change the section based on the emitted value
    if (event === 'backToParent') {
      this.section = 'other';
    }
  }
  getCategory() {
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=2').subscribe((response: any) => {
      if (response.success) {
        this.teamList = response.data;
      } else {
        alert('Failed to load categories.');
      }
    }, error => {
      console.error('Error fetching categories:', error);
      alert('An error occurred. Please try again.');
    });
    this.http.get('https://rigidjersey.com/backend-api/api/get_category.php?category_type_id=3').subscribe((response: any) => {
      if (response.success) {
        this.accList = response.data;
      } else {
        alert('Failed to load categories.');
      }
    }, error => {
      console.error('Error fetching categories:', error);
      alert('An error occurred. Please try again.');
    });
  }
    // Navigate to the category details page
    onTypeClick(category: any) {
      this.router.navigate(['/details-category'], { queryParams: { id: category.id } });
    }
}