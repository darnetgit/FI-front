// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  logInFail: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.authService.setUser(response);
      }else{
        this.logInFail=true;
      }
    }, error => {
      console.error(error);
    });
  }

}
