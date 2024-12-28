import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  @Output() navigateBack = new EventEmitter<string>();
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack() {
    // Emit a value when this method is called
    this.navigateBack.emit('backToParent');
  }
}
