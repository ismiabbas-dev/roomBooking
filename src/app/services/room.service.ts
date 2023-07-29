import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `${sessionStorage.getItem('token')}`,
};

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return from(this.http.get(`${apiUrl}/room`, { headers }));
  }

  getRoom(id: number): Observable<any> {
    return from(this.http.get(`${apiUrl}/room/${id}`, { headers }));
  }

  createRoom(room: Object): Observable<Object> {
    return from(this.http.post(`${apiUrl}/room`, room, { headers }));
  }

  updateRoom(id: number, room: any): Observable<Object> {
    return from(this.http.put(`${apiUrl}/room/${id}`, room, { headers }));
  }

  deleteRoom(id: number): Observable<any> {
    return from(this.http.delete(`${apiUrl}/room/${id}`, { headers }));
  }
}
