import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  bookings: any[] = [];
  profileForm: FormGroup;
  editing = false;

  constructor(
    private booking: BookingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBookings();
    this.profileForm = this.formBuilder.group({
      name: ['John Doe', Validators.required],
      email: ['johndoe@example.com', [Validators.required, Validators.email]],
      phone: ['123-456-7890', Validators.required],
    });
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

  toggleEditing() {
    if (this.editing) {
      // Save the changes
      if (this.profileForm.valid) {
        // Perform the save operation here, e.g., update the user profile in the backend
        console.log(this.profileForm.value); // Replace with your save logic
        this.editing = false;
      }
    } else {
      this.editing = true;
    }
  }
}
