import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Room, RoomResponse } from 'src/app/model';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {
  rooms: Room[] = [];
  toastMessage: string = 'This is a toast';
  show: boolean = false;
  toastStyle: string = 'bg-success text-light';

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe((rooms: RoomResponse[]) => {
      this.rooms = rooms
        .filter((room: RoomResponse) => {
          return room.RoomStatus === 1;
        })
        .map((room: RoomResponse) => {
          return {
            id: room.RoomID,
            type: room.RoomType,
            number: room.RoomNumber,
            status: room.RoomStatus,
          };
        });
    });
  }

  bookRoom(roomId: number) {
    this.bookingService.createBooking(roomId).subscribe({
      next: (data) => {
        this.bookingService.bookingCount$.next(
          this.bookingService.bookingCount$.getValue() + 1
        );
        this.toastMessage = 'Booking created successfully';
        this.show = true;
        this.getRooms();
      },
      error: (error) => {
        this.toastMessage = `Error creating booking: ${error.error.message}`;
        this.toastStyle = 'bg-danger text-light';
        this.show = true;
      },
    });
  }
}
