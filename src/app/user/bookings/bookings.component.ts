import { Component } from '@angular/core';
import { Booking, BookingDetails, BookingResponse } from 'src/app/model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
})
export class BookingsComponent {
  show = false;
  toastMessage = '';
  toastStyle = 'bg-success text-light';
  bookings: any[] = [];
  userId = localStorage.getItem('userId')!;

  constructor(private booking: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.booking.getBookings().subscribe((data) => {
      this.bookings = data
        .filter((booking: any) => booking.userID == this.userId)
        .map((booking: any) => {
          return {
            id: booking.bookingID,
            roomId: booking.roomID,
            status: booking.bookingStatus,
            userId: booking.userID,
            roomNumber: booking.roomNumber,
            roomType: booking.RoomType,
            bookedBy: booking.Name,
            bookingStatus:
              booking.bookingStatus == 0
                ? 'Booked'
                : booking.bookingStatus == 1
                ? 'Rejected'
                : 'Approved',
          } as Booking;
        });
    });
  }
}
