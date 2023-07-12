import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, pipe } from 'rxjs';
import { Booking, BookingResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8080';
  public bookingCount$ = new BehaviorSubject<number>(0);

  userId = localStorage.getItem('userId')!;

  constructor(private http: HttpClient) {
    this.getBookings()
      .pipe(
        map((bookings: any) =>
          bookings.filter(
            (booking: BookingResponse) =>
              booking.UserID == parseInt(this.userId)
          )
        ),
        map((filteredBookings) => filteredBookings.length)
      )
      .subscribe((count) => {
        this.bookingCount$.next(count);
      });
  }

  createBooking(roomId: number): Observable<Booking> {
    return this.http.post<Booking>(
      '/booking',
      {
        roomId,
        userId: this.userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/booking/${id}`);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.apiUrl}/booking/${booking.id}`,
      booking
    );
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking/${id}`);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking`);
  }
}
