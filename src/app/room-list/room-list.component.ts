import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room, RoomResponse } from '../model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: RoomResponse[]) => {
      this.rooms = rooms.map((room: RoomResponse) => {
        return {
          id: room.RoomID,
          type: room.RoomType,
          number: room.RoomNumber,
          status: room.RoomStatus,
        };
      });
    });
  }
}
