import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/model';
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

  toast = {
    show: false,
    message: '',
    style: '',
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
            id: booking.bookingID,
            roomId: booking.roomID,
            userId: booking.userID,
            status: booking.bookingStatus,
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
          id: data.bookingID,
          roomId: data.roomID,
          userId: data.userID,
          status: data.bookingStatus,
          name: data.userName,
          roomNumber: data.roomNumber,
          type: data.roomType,
        };
      },
    });
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBooking(id).subscribe({
      next: (data) => {
        this.toast = {
          show: true,
          message: 'Booking deleted successfully',
          style: 'bg-success text-white',
        };
      },
      error: (error) => {
        this.toast = {
          show: true,
          message: 'Error deleting booking',
          style: 'bg-danger text-white',
        };
      },
      complete: () => {
        this.modal.dismissAll();
        this.loadAllBookings();
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

  confirmDeleteModal(content: any, roomId: any) {
    this.getBooking(roomId);
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

  rejectBooking(booking: Booking) {
    booking.status = 1;
    this.updateBooking(booking);
    this.modal.dismissAll();
    this.loadAllBookings();
  }
}
