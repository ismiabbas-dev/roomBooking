import { Component } from '@angular/core';

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

  constructor() {}
}
