import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  value:boolean;
  constructor(private router: Router,private authService:AuthService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.value = status;
    });  
  }
  logout() {
    this.authService.logout();
    this.value = false; 
    this.router.navigate(['/'])
  }
}