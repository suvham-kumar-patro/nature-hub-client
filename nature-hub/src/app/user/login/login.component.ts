import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showRedirectMessage: boolean = false;

  constructor(
    private autService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if redirected to login due to lack of auth
    this.route.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.showRedirectMessage = true;
      }
    });
  }

  Login() {
    const data = {
      UName: this.username,
      UPassword: this.password
    };
    this.autService.login(data).subscribe(response => {
      localStorage.setItem('jwtToken', response.token);
      this.router.navigate(['/']);
      console.log(response);
    });
  }
}