import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  loginbtnclick() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('https://rigidjersey.com/backend-api/api/login.php', loginData).subscribe((response: any) => {
      if (response.success) {
        // Redirect to the admin dashboard if login is successful
        this.router.navigate(['/admin-dashboard']);
      } else {
        // Handle unsuccessful login here, like showing an error message
        alert('Login failed. Please check your credentials.');
      }
    }, error => {
      // Handle HTTP errors
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    });
  }
}