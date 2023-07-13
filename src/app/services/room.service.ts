import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return from(this.http.get(`${apiUrl}/room`));
  }

  getRoom(id: number): Observable<any> {
    return from(this.http.get(`${apiUrl}/room/${id}`));
  }

  createRoom(room: Object): Observable<Object> {
    return from(
      this.http.post(`${apiUrl}/room`, room, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }

  updateRoom(id: number, room: any): Observable<Object> {
    return from(
      this.http.put(`${apiUrl}/room/${id}`, room, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }

  deleteRoom(id: number): Observable<any> {
    return from(this.http.delete(`${apiUrl}/room/${id}`));
  }
}
