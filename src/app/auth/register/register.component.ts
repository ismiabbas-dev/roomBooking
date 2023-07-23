import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  toastMessage: string = '';
  show = false;
  toastStyle = 'bg-success text-light';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: '',
      name: '',
      password: '',
      photo: 'photoexample.jpg',
      role: 'member',
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        this.toastMessage = 'User registered successfully';
        this.show = true;
      },
      error: (error) => {
        this.toastMessage = error.error.message;
        this.toastStyle = 'bg-danger text-light';
        this.show = true;
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/auth/sign-in']);
        }, 2000);
      },
    });
  }
}
