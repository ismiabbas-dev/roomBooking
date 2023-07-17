import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { Room, RoomResponse } from '../../model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  addRoomForm: FormGroup = new FormGroup({
    roomType: new FormGroup({}),
    roomNumber: new FormGroup({}),
    status: new FormGroup({}),
  });

  toast = {
    show: false,
    message: '',
    style: '',
  };
  selectedRoom: any = {
    id: 0,
    roomType: '',
    roomNumber: 0,
    bookedBy: '',
    status: 1,
  };

  constructor(
    private roomService: RoomService,
    private modal: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRooms();

    this.addRoomForm = this.formBuilder.group({
      roomType: ['', Validators.required],
      roomNumber: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  getRooms() {
    this.roomService.getRooms().subscribe((rooms: RoomResponse[]) => {
      this.rooms = rooms.map((room: RoomResponse) => {
        return {
          id: room.roomID,
          type: room.roomType,
          number: room.roomNumber,
          status: room.roomStatus,
          bookedBy: room.userName,
        };
      });
    });
  }

  openAddRoomModal(content: any) {
    this.modal.open(content);
  }
  openEditRoomModal(content: any, room: Room) {
    this.selectedRoom = room;
    this.modal.open(content, {
      centered: true,
    });

    this.addRoomForm.setValue({
      roomType: room.type,
      roomNumber: room.number,
      status: room.status,
    });

    console.log(this.addRoomForm.value);
  }

  openDeleteRoomModal(content: any, room: Room) {
    this.selectedRoom = room;
    this.modal.open(content);
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.selectedRoom.id).subscribe({
      next: () => {
        this.toast = {
          show: true,
          message: 'Room deleted successfully',
          style: 'bg-success text-white',
        };
      },
      error: (err) => {
        this.toast = {
          show: true,
          message: 'Error deleting room: ' + err.error,
          style: 'bg-danger text-white',
        };
      },
      complete: () => {
        this.modal.dismissAll();
        this.getRooms();
      },
    });
  }

  updateRoom() {
    const editRoom: any = {
      type: this.addRoomForm.value.roomType,
      number: this.addRoomForm.value.roomNumber,
    };
    this.roomService.updateRoom(editRoom, this.selectedRoom).subscribe({
      next: () => {
        this.toast = {
          show: true,
          message: 'Room updated successfully',
          style: 'bg-success text-white',
        };
      },
      error: (err) => {
        this.toast = {
          show: true,
          message: 'Error updating room: ' + err.error,
          style: 'bg-danger text-white',
        };
      },
      complete: () => {
        this.getRooms();
      },
    });
  }

  onSubmit(type: string) {
    const newRoom: any = {
      type: this.addRoomForm.value.roomType,
      number: this.addRoomForm.value.roomNumber,
      status: this.addRoomForm.value.status,
    };

    if (type === 'add') {
      this.roomService.createRoom(newRoom).subscribe({
        next: (room: any) => {
          this.toast = {
            show: true,
            message: 'Room added successfully',
            style: 'bg-success text-white',
          };
        },
        error: (err: any) => {
          this.toast = {
            show: true,
            message: 'Error adding room: ' + err.error,
            style: 'bg-danger text-white',
          };
        },
        complete: () => {
          this.addRoomForm.reset();
          this.modal.dismissAll();
          this.getRooms();
        },
      });
    } else {
      this.roomService.updateRoom(this.selectedRoom.id, newRoom).subscribe({
        next: (room: any) => {
          console.log(room);
          this.toast = {
            show: true,
            message: 'Room updated successfully',
            style: 'bg-success text-white',
          };
        },
        error: (err: any) => {
          this.toast = {
            show: true,
            message: 'Error updating room',
            style: 'bg-danger text-white',
          };
        },
        complete: () => {
          this.addRoomForm.reset();
          this.modal.dismissAll();
          this.getRooms();
        },
      });
    }
  }
}
