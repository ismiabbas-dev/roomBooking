import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title = 'Room Reservation System';
  role: string = 'admin';

  titleLink = '/';

  public isCollapsed = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    public bookingService: BookingService
  ) {
    this.role = this.auth.getRole();
    this.bookingService.getBookings();
    if (this.role === 'admin') {
      this.titleLink = '/admin/dashboard/room';
    } else {
      this.titleLink = '/user/rooms';
    }
  }

  ngOnInit(): void {}

  logout() {
    sessionStorage.clear();
    this.auth.userSignedIn$.next(false);
    this.router.navigate(['/auth/sign-in']);
  }
}
