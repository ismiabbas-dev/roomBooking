export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  status: number;
  name?: string;
  roomNumber?: number;
  type?: string;
}

export interface BookingResponse {
  bookingID: number;
  roomID: number;
  bookingStatus: number;
  userID: number;
  roomNumber: number;
  name: string;
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
  roomID: number;
  roomNumber: number;
  roomType: string;
  roomStatus: number;
  userName: string;
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
