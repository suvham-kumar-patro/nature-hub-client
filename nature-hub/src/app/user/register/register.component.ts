import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}
 
  submit(form: NgForm): void {
    // If form is invalid, we should return early to prevent submission
    if (form.invalid) {
      return;
    }
   

    // Collect the form data into a user object
    const user = {
        // Set a default value (e.g., 0 or any other suitable default)
      UName: form.value.name,
      UPassword: form.value.password,
    };

    console.log('Submitting User:', user);  // Optional logging

    // Call the UserService to add the user (send data to the backend)
    this.userService.addUser(user).subscribe({
      next: (data) => {
        console.log('User registered successfully:', data);
        // Redirect the user to login page upon successful registration
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Registration failed:', error);

        // Check if the error is plain text (non-JSON response)
        if (error.error instanceof String) {
          // If the error message is a string (plain text), set it as the errorMessage
          this.errorMessage = error.error;
        } else if (error.status === 400) {
          // If the error is a BadRequest (HTTP 400), handle it differently
          this.errorMessage = error.error?.message || 'User already exists or invalid input';
        } else {
          // Handle any other type of error
          this.errorMessage = 'Something went wrong! Please try again.';
        }

        alert(this.errorMessage);  // Optionally show the error message
      },
    });
  }
}