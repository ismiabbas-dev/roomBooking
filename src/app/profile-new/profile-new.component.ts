import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-new',
  templateUrl: './profile-new.component.html',
  styleUrls: ['./profile-new.component.css'],
})
export class ProfileNewComponent {
  editProfileForm = this.fb.group({
    name: [''],
    email: [''],
    photo: [''],
  });

  userId = localStorage.getItem('userId')!;

  toast = {
    show: false,
    message: '',
    style: 'bg-success text-light',
  };

  userProfiles: any = {
    name: 'Raziq',
    userId: 1,
    email: 'ziq@test.com',
    role: 'user',
    photo: null,
  };

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  getUser() {
    return this.userService.getUserProfile(parseInt(this.userId)).subscribe({
      next: (data) => {
        this.userProfiles = {
          name: data.name,
          userId: data.id,
          email: data.email,
          role: data.role,
          photo: data.photo,
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

  editProfileModal(content: any) {
    this.editProfileForm.setValue({
      name: this.userProfiles.name,
      email: this.userProfiles.email,
      photo: this.userProfiles.photo,
    });
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    const user = this.editProfileForm.value;
    this.userService.updateUserProfile(user, parseInt(this.userId)).subscribe({
      next: (data) => {
        this.toast = {
          show: true,
          message: 'Profile Updated',
          style: 'bg-success text-light',
        };
      },
      error: (error) => {
        this.toast = {
          show: true,
          message: 'Profile Update Failed',
          style: 'bg-danger text-light',
        };
      },
      complete: () => {
        this.getUser();
        this.modalService.dismissAll();
      },
    });
  }
}
