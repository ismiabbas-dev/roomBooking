import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAvailable() {
    throw new Error('Method not implemented.');
  }
  public userSignedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  login(email: string | null, password: string | null): Observable<any> {
    return this.http.post(
      `${apiUrl}/auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getRole(): string {
    return localStorage.getItem('role')!;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
