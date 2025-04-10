import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API URL for login
  readonly ppApiUrl = 'https://localhost:44337/api/Auth/login';

  // BehaviorSubject to track authentication status
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Check if a token exists in localStorage to determine if user is authenticated
  private checkToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // Login method: it stores the token in localStorage and updates the auth state
  login(loginData: User) {
    return this.http.post<any>(this.ppApiUrl, loginData).pipe(
      tap(response => {
        // Save the JWT token to localStorage
        localStorage.setItem('jwtToken', response.token);
        // Update the auth state to true
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Get the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Logout method: removes the token from localStorage and updates the auth state
  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Update the auth state to false
    this.isAuthenticatedSubject.next(false);
  }

  // Method to check if the user is authenticated based on token
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
