import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  map,
  throwError,
} from 'rxjs';
import { Booking, BookingResponse } from '../model';
import { environment } from '../../environments/environment';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `${localStorage.getItem('token')}`,
};

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
              booking.userID == parseInt(this.userId)
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
          headers,
        }
      )
    );
  }

  getBooking(id: number): Observable<Booking> {
    return from(
      this.http.get<Booking>(`${apiUrl}/booking/${id}`, {
        headers,
      })
    );
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return from(
      this.http.put<Booking>(`${apiUrl}/booking/${booking.id}`, booking, {
        headers,
      })
    );
  }

  deleteBooking(id: number): Observable<void> {
    return from(this.http.delete<void>(`${apiUrl}/booking/${id}`, { headers }));
  }

  getBookings(): Observable<Booking[]> {
    return from(this.http.get<Booking[]>(`${apiUrl}/booking`, { headers }));
  }
}
