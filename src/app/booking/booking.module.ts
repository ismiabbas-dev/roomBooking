import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookingService } from '../services/booking.service';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BookingModule implements OnInit {
  constructor(private bookingService: BookingService) {}
  ngOnInit() {}

  getBooking(id: number) {
    this.bookingService.getBooking(id).subscribe((booking) => {
      console.log(booking);
    });
  }

  loadBooking() {
    this.bookingService.getBookings().subscribe((bookings) => {
      console.log(bookings);
    });
  }

  addBooking(booking: any) {
    this.bookingService.createBooking(booking).subscribe((booking) => {
      console.log(booking);
    });
  }
}
