import { Component } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
ngOnInit(): void {
  document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-container");
    if (header) {
      setTimeout(() => {
        header.classList.add("loaded");
      }, 100); // Delay to ensure smooth transition
    }
  });
}


}
