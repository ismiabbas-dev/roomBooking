import { Component } from '@angular/core';
import { Room, RoomResponse } from 'src/app/model';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
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
    this.bookingService.bookingCount$.next(
      this.bookingService.bookingCount$.getValue() + 1
    );

    this.bookingService.createBooking(roomId).subscribe((booking) => {
      console.log(booking);
    });
    window.alert('Room booked successfully!');
  }
}
