import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

 
  loginbtnclick() {
    // Navigate to the admin-dashboard route without reloading the page
    this.router.navigate(['/admin-dashboard']);
  }

}
