import { Component } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
ngOnInit(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-container');
    if (header) {
        // Add the fade-in class after a slight delay to make the effect more noticeable
        setTimeout(() => {
            header.classList.add('fade-in');
        }, 500); // 100ms delay for smoother animation
    }
});
}


}
