export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  status: number;
}

export interface BookingResponse {
  BookingID: number;
  RoomID: number;
  BookingStatus: number;
  UserID: number;
  RoomNumber: number;
  Name: string;
}

export interface BookingDetails {
  id: number;
  roomId: number;
  userId: number;
  status: number;
  bookingId: number;
  roomNumber: number;
  roomType: string;
  name: string;
}

export interface Room {
  id: number;
  number: number;
  type: string;
  status: number;
  bookedBy: string;
}

export interface RoomResponse {
  RoomID: number;
  RoomNumber: number;
  RoomType: string;
  RoomStatus: number;
  Name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
}

export enum roomStatus {
  active = 1,
  inactive = 0,
}

export enum roomType {
  single = 'single',
  double = 'double',
}

export enum BookingStatus {
  booked = 0,
  rejected = 1,
  approved = 2,
}
