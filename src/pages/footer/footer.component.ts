import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  name: string = '';
  email: string = '';
  subscribed: boolean=false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // Regular expression for validating email
  private isEmail(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
  }

  // Regular expression for validating phone number (simple check for numeric characters)
  private isPhone(value: string): boolean {
    const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
    return phoneRegex.test(value);
  }

  subscribe() {
    if (this.name && (this.isEmail(this.email) || this.isPhone(this.email))) {
      // Prepare the payload
      const payload: any = {
        name: this.name,
      };

      if (this.isEmail(this.email)) {
        payload.email = this.email;
      } else if (this.isPhone(this.email)) {
        payload.phone = this.email;
      }

      // Set up the headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',  // Add content type as application/json
      });

      // Call the API with the payload and headers
      this.http.post('https://rigidjersey.com/backend-api/api/add_subscribers.php', payload, { headers })
        .subscribe(
          (response) => {
            console.log('Subscription successful:', response);
            this.subscribed=true
            this.email='';
            this.name='';
            // Handle success response
          },
          (error) => {
            this.snackBar.open(error.error.error, 'Close', {duration: 3000, // 3 seconds
              horizontalPosition: 'center', // To center it horizontally
              verticalPosition: 'top', 
              panelClass: ['custom-snack-bar']});
            // Handle error response
          }
        );
    } else {
      console.log('Please fill out both fields correctly');
    }
  }
}