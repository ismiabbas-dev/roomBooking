import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  userId = localStorage.getItem('userId')!;

  userProfiles: any = {
    name: 'Raziq',
    userId: 1,
    email: 'ziq@test.com',
    role: 'user',
    photo: null,
  };

  getUser() {
    return this.userService
      .getUserProfile(parseInt(this.userId, 10))
      .subscribe({
        next: (data) => {
          this.userProfiles = {
            name: data.Name,
            userId: data.UserID,
            email: data.Email,
            role: data.Role,
            photo: data.Photo,
          };
        },
        error: (error) => {},
        complete: () => {
          console.log('Completed', this.userProfiles);
        },
      });
  }

  ngOnInit(): void {
    this.getUser();
  }
}
