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
    type: new FormGroup({}),
    number: new FormGroup({}),
  });
  toastMessage: string = '';
  show = false;
  toastStyle = 'bg-success text-light';
  selectedRoom: Room = {
    id: 0,
    type: '',
    number: 0,
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
      type: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  getRooms() {
    this.roomService.getRooms().subscribe((rooms: RoomResponse[]) => {
      this.rooms = rooms.map((room: RoomResponse) => {
        return {
          id: room.RoomID,
          type: room.RoomType,
          number: room.RoomNumber,
          status: room.RoomStatus,
          bookedBy: room.Name,
        };
      });
    });
  }

  openAddRoomModal(addRoomModal: any) {
    this.modal.open(addRoomModal);
  }
  openEditRoomModal(editRoomModal: any, room: Room) {
    this.selectedRoom = room;
    this.modal.open(editRoomModal);
    this.addRoomForm.setValue({
      type: room.type,
      number: room.number,
    });
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe({
      next: (data) => {
        this.toastMessage = 'Room deleted successfully';
        this.show = true;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getRooms();
      },
    });
  }

  onSubmit(type: string) {
    const newRoom: any = {
      type: this.addRoomForm.value.type,
      number: this.addRoomForm.value.number,
    };

    const roomId: number = this.rooms.find((room: Room) => room.id === roomId)
      ?.id!;

    if (type === 'edit') {
      this.roomService.createRoom(newRoom).subscribe({
        next: (room: any) => {
          this.getRooms();
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.toastMessage = 'Room added successfully';
          this.show = true;
          this.addRoomForm.reset();
          this.modal.dismissAll();
        },
      });
    } else {
      this.roomService.updateRoom(this.selectedRoom.id, newRoom).subscribe({
        next: (room: any) => {
          this.getRooms();
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.toastMessage = 'Room added successfully';
          this.show = true;
          this.addRoomForm.reset();
          this.modal.dismissAll();
        },
      });
    }
  }
}
