import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private auth: AuthService) {}

  login(username: string, password: string): void {
    this.auth.login(username, password).subscribe((res) => {
      if (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {}
}
