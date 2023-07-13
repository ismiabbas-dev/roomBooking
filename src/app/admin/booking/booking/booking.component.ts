import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking, BookingResponse } from 'src/app/model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        data.forEach((booking: any) => {
          this.bookings.push({
            id: booking.BookingID,
            roomId: booking.RoomID,
            userId: booking.UserID,
            status: booking.BookingStatus,
            name: booking.Name,
            roomNumber: booking.RoomNumber,
          });
        });
      },
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
    this.bookingService.updateBooking(booking).subscribe({
      next: (data) => {
        console.log(data);
        this.loadAllBookings();
      },
    });
  }

  viewBookingDetail(x: any, y: any) {
    this.modal.open(x, { centered: true });
  }
  deleteRoom(content: any, booking: Booking) {
    this.modal.open(content, {
      centered: true,
      keyboard: true,
    });
  }
}
