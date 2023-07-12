import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking, BookingDetails} from "../../model";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  bookings: any[] = []

  constructor(private booking: BookingService) {
  }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.booking.getBookings().subscribe((data) => {
      this.bookings = data.map((booking: any) => {
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
