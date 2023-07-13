import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/user/${id}`));
  }

  updateUserProfile(user: any, id: number): Observable<Object> {
    return from(this.http.put(`${this.baseUrl}/user/${id}`, user));
  }
}
