import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  bookings: any[] = [];
  userId = localStorage.getItem('userId');

  constructor(private booking: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    console.log(this.userId);
    this.booking.getBookings().subscribe((data) => {
      this.bookings = data
        .filter((booking: any) => booking.UserID == this.userId)
        .map((booking: any) => {
          return {
            id: booking.BookingID,
            roomId: booking.RoomID,
            status: booking.BookingStatus,
            userId: booking.UserID,
            roomNumber: booking.RoomNumber,
            roomType: booking.RoomType,
            bookedBy: booking.Name,
            bookingStatus:
              booking.BookingStatus == 0
                ? 'Booked'
                : booking.BookingStatus == 1
                ? 'Rejected'
                : 'Approved',
          };
        });
    });
  }
}
