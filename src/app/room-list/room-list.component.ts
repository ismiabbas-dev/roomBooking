import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService) {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log(this.rooms);
    });
  }

  ngOnInit(): void {}
}
