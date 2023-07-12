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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: '',
      password: '',
      email: '',
      photo: '',
    });
  }

  register() {
    // this.authService.register(this.registerForm.value).subscribe((res) => {
    //   if (res.success) {
    //     this.router.navigate(['/login']);
    //   }
    // });
    console.log('registerForm', this.registerForm.value);
  }
}
