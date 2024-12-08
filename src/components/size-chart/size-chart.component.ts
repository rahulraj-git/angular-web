import { Component } from '@angular/core';

@Component({
  selector: 'app-size-chart',
  templateUrl: './size-chart.component.html',
  styleUrls: ['./size-chart.component.scss']
})
export class SizeChartComponent {
// Array of local image URLs
images = [
  'assets/pant.jpeg',
  'assets/shirt.jpeg',
  'assets/trouser.jpeg',
];
}
