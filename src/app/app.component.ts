import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'roomBooking';
  users: any = [];
  listing: any = [];
  booking: any = [];
  listingByAdmin: any = [];
  listingByName: any = [];
  listingByCity: any = [];

  isLoggedIn = false;
  constructor(public authService: AuthService) {
    this.authService.userSignedIn$.subscribe((signedIn) => {
      console.log('signedIn', signedIn);
      this.isLoggedIn = signedIn;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
