import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  @Output() navigateBack = new EventEmitter<string>();

  goBack() {
    // Emit a value when this method is called
    this.navigateBack.emit('backToParent');
  }
}
