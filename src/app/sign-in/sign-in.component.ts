import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  email = '';
  passwor = '';

  constructor(public router: Router, private auth: AuthService) {}

  onSubmit(email: string, password: string): void {
    this.auth.login(email, password).subscribe((res) => {
      console.log(res);
      localStorage.setItem('role', res.role);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard/admin']);
    });
  }
}
