import { Component } from '@angular/core';
import { Booking } from 'src/app/model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings() {
    this.bookingService.getBookings().subscribe((data) => {
      console.log(data);
    });
  }

  getBooking(id: number) {
    this.bookingService.getBooking(id).subscribe((data) => {
      console.log(data);
    });
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBooking(id).subscribe((data) => {
      console.log(data);
      this.loadAllBookings();
    });
  }

  updateBooking(booking: Booking) {
    this.bookingService.updateBooking(booking).subscribe((data) => {
      console.log(data);
      this.loadAllBookings();
    });
  }
}
