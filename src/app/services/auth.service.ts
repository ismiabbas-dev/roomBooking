import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { apiUrl } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A subject that emits a boolean value indicating whether the user is signed in or not.
   */
  public userSignedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  /**
   * Sends a POST request to the server to log in the user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns An observable that emits the response from the server.
   */
  login(email: string | null, password: string | null): Observable<any> {
    return from(
      this.http.post(
        `${apiUrl}/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
  }

  /**
   * Sends a POST request to the server to register a new user.
   * @param user The user object containing the user's information.
   * @returns An observable that emits the response from the server.
   */
  register(user: any): Observable<any> {
    return from(
      this.http.post(`${apiUrl}/auth/register`, user, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }

  /**
   * Gets the role of the currently logged in user from local storage.
   * @returns The role of the currently logged in user.
   */
  getRole(): string {
    return localStorage.getItem('role')!;
  }

  /**
   * Checks whether the user is currently logged in or not.
   * @returns A boolean value indicating whether the user is logged in or not.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
