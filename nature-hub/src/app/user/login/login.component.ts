import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private autService:AuthService,private router:Router){}
  Login()
  {
    const data={
      UName:this.username,
      UPassword:this.password
    }
     this.autService.login(data).subscribe(response => {
      // Save the JWT token to localStorage
      localStorage.setItem('jwtToken', response.token)
      this.router.navigate(['/']);
      console.log(response)
    })
  }
}