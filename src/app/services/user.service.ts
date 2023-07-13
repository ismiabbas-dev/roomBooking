import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<any> {
    return from(this.http.get(`${apiUrl}/user/${id}`));
  }

  updateUserProfile(user: any, id: number): Observable<Object> {
    return from(this.http.put(`${apiUrl}/user/${id}`, user));
  }
}
