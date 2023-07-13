import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Booking, BookingResponse } from '../model';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BookingService {
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

  get bookingsCount() {
    return this.bookingCount$.asObservable();
  }

  createBooking(roomId: number): Observable<Booking> {
    return from(
      this.http.post<Booking>(
        `${apiUrl}/booking`,
        {
          roomId,
          userId: parseInt(this.userId),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    );
  }

  getBooking(id: number): Observable<Booking> {
    return from(this.http.get<Booking>(`${apiUrl}/booking/${id}`));
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return from(
      this.http.put<Booking>(`${apiUrl}/booking/${booking.id}`, booking)
    );
  }

  deleteBooking(id: number): Observable<void> {
    return from(this.http.delete<void>(`${apiUrl}/booking/${id}`));
  }

  getBookings(): Observable<Booking[]> {
    return from(this.http.get<Booking[]>(`${apiUrl}/booking`));
  }
}
