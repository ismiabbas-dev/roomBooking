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
  bookingDetails: Booking = {
    id: 0,
    roomId: 0,
    userId: 0,
    status: 0,
    name: '',
    roomNumber: 0,
    type: '',
  };

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
        this.bookings = data.map((booking: any) => {
          return {
            id: booking.BookingID,
            roomId: booking.RoomID,
            userId: booking.UserID,
            status: booking.BookingStatus,
            name: booking.Name,
            roomNumber: booking.RoomNumber,
            type: booking.RoomType,
          };
        });
      },
      complete: () => {
        console.log(this.bookings);
      },
    });
  }

  getBooking(id: number) {
    this.bookingService.getBooking(id).subscribe({
      next: (data: any) => {
        this.bookingDetails = {
          id: data[0].BookingID,
          roomId: data[0].RoomID,
          userId: data[0].UserID,
          status: data[0].BookingStatus,
          name: data[0].Name,
          roomNumber: data[0].RoomNumber,
          type: data[0].RoomType,
        };
      },
    });
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBooking(id).subscribe({
      next: (data) => {
        this.loadAllBookings();
      },
      error: (error) => {
        window.alert(error.error);
      },
      complete: () => {
        this.modal.dismissAll();
      },
    });
  }

  updateBooking(booking: Booking) {
    this.bookingService.updateBooking(booking).subscribe({
      next: (data) => {
        this.loadAllBookings();
      },
    });
  }

  viewBookingDetail(content: any, roomId: any) {
    this.modal.open(content, { centered: true });
    this.getBooking(roomId);
  }

  deleteRoom(content: any, booking: Booking) {
    this.modal.open(content, {
      centered: true,
      keyboard: true,
    });
  }

  approveBooking(booking: Booking) {
    booking.status = 2;
    this.updateBooking(booking);
    this.modal.dismissAll();
    this.loadAllBookings();
  }
}
