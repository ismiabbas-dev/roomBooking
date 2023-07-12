import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  login(username: string, password: string): void {
    this.auth.login(username, password).subscribe((res) => {
      if (res) {
        this.auth.userSignedIn$.next(true);
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.id);

        if (res.role === 'user') {
          this.router.navigate(['/user/dashboard']);
        } else {
          this.router.navigate(['/admin/']);
        }
      }
    });
  }

  signInForm = this.fb.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    const email = this.signInForm.get('email')?.value ?? '';
    const password = this.signInForm.get('password')?.value ?? '';
    this.login(email, password);
  }
}
