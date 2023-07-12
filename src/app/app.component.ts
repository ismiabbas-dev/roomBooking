import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'roomBooking';
  users: any = [];
  listing: any = [];
  booking: any = [];
  listingByAdmin: any = [];
  listingByName: any = [];
  listingByCity: any = [];

  userSignedIn = false;

  constructor(authService: AuthService) {
    authService.userSignedIn$.subscribe((signedIn) => {
      console.log('signIn state', signedIn);
      this.userSignedIn = signedIn;
    });
  }
}
