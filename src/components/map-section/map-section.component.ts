import { Component } from '@angular/core';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.scss']
})
export class MapSectionComponent {
  redirectToGoogleMap() {
    // Replace 'YourGoogleMapsLinkHere' with your actual Google Maps URL
    window.open('https://www.google.com/maps/place/Rigid+Custom+Jersey+Manufacturer/@12.8624876,75.0512113,17z/data=!4m6!3m5!1s0x3ba4a700004c7f6f:0x30ebd56ca62abae5!8m2!3d12.8628125!4d75.0513125!16s%2Fg%2F11lf8s77x2?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D', '_blank');
  }
}
