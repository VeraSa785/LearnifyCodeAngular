import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface User {
  username: string;
  email: string;
  uid: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private baseUrl = 'https://learnifycode-backend.onrender.com/auth';
  private loggedIn = new BehaviorSubject<boolean>(false); // Default to not logged in

  // private users: User[] = [
  //   { username: 'john', email: 'john@example.com', password: 'john123', avatarUrl: '/avatars/avatar_1.png' },
  //   { username: 'anny', email: 'anny@example.com', password: 'anny123', avatarUrl: '/avatars/avatar_4.png' },
  //   { username: 'doe', email: 'doe@example.com', password: 'doe123', avatarUrl: '/avatars/avatar_7.png' }
  // ];

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(loginData: { email: string | null | undefined; password: string | null | undefined }): Observable<boolean> {
    this.loggedIn.next(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Default values for email or password if they are null or undefined
    const email = loginData.email ?? '';
    const password = loginData.password ?? '';

    if (!email || !password) {
      return throwError(() => new Error('Email and password must not be empty'));
    }

    return this.http.post<any>(`${this.baseUrl}/login`, {email, password}, httpOptions)
      .pipe(
        map(response => {
          if (response && response.idToken) {

            const user: User = {
              email,
              username: response.name,
              uid: response.uid,
              avatarUrl: response.avatar_url
            };

            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return true;
          }
          throw new Error('Login failed');
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed, please check credentials and try again.'));
        })
      );
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // userExists(username: string, email: string): boolean {
  //   return this.users.some(u => u.username === username || u.email === email);
  // }
  //
  // emailExists(email: string): boolean {
  //   return this.users.some(u => u.email === email);
  // }
  //
  // usernameExists(username: string): boolean {
  //   return this.users.some(u => u.username === username);
  // }

  signUp(username: string, email: string, password: string, avatarUrl: string): Observable<User> {
    this.loggedIn.next(true);
    const userData = {
      name: username,
      email: email,
      password: password,
      avatar_url: avatarUrl
    };

    return this.http.post<any>(`${this.baseUrl}/signup`, userData).pipe(
      map(response => {
        if (response && response.user_id) {
          // Create user object based on the expected structure
          const user: User = {
            email: email,
            username: username,
            uid: response.user_id,
            avatarUrl: avatarUrl
          };
          // Store user details in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        throw new Error('Signup failed: User ID not provided');
      }),
      catchError(error => {
        console.error('Signup failed:', error);
        return throwError(() => new Error('Signup failed, please check provided details and try again.'));
      })
    );
  }
}
