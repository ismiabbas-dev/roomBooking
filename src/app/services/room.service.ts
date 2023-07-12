import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/room`));
  }

  getRoom(id: number): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/room/${id}`));
  }

  createRoom(room: Object): Observable<Object> {
    return from(
      this.http.post(`${this.baseUrl}/room`, room, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }

  updateRoom(id: number, room: any): Observable<Object> {
    return from(this.http.put(`${this.baseUrl}/room/${id}`, room));
  }

  deleteRoom(id: number): Observable<any> {
    return from(
      this.http.delete(`${this.baseUrl}/room/${id}`, {
        responseType: 'text',
      })
    );
  }
}
