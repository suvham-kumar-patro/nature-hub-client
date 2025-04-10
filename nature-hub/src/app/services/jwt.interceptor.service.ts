import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor { 
  constructor(
    private authenticationService: AuthService,
    private router: Router // Inject Router for redirection
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authenticationService.getToken(); // Retrieve token from AuthService

    console.log('Interceptor: Token:', token);

    if (token) {
      // If token exists, add Authorization header to the request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.error('No token found in localStorage');
    }

    // Handle the HTTP request and catch errors like 401 Unauthorized
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is expired or invalid, redirect to login
          console.error('Unauthorized access - Redirecting to login');
          this.authenticationService.logout(); // Log out user if token is invalid
          this.router.navigate(['/login']); // Navigate to login page
        }
        return throwError(error); // Propagate the error
      })
    );
  }
}
