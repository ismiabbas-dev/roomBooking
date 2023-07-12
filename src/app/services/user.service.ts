import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/user`));
  }

  updateUserProfile(user: any): Observable<Object> {
    return from(this.http.put(`${this.baseUrl}/user`, user));
  }
}
