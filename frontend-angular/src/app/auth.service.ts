import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

export interface User {
  username: string;
  email: string;
  uid: string;
  avatarUrl: string;
  avatarWidth: number;
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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    let storedUser: User | null = null;

    if (isPlatformBrowser(this.platformId)) {
      const storedUserData = localStorage.getItem('currentUser');
      storedUser = storedUserData ? JSON.parse(storedUserData) : null;
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
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
            const avatarUrl = response.avatar_url;
            const avatarWidth = this.getAvatarWidth(avatarUrl);

            const user: User = {
              email,
              username: response.name,
              uid: response.uid,
              avatarUrl: avatarUrl,
              avatarWidth: avatarWidth
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

  signUp(username: string, email: string, password: string, avatarUrl: string, avatarWidth: number): Observable<User> {
    this.loggedIn.next(true);
    const userData = {
      name: username,
      email: email,
      password: password,
      avatar_url: avatarUrl,
      avatarWidth: avatarWidth
    };

    return this.http.post<any>(`${this.baseUrl}/signup`, userData).pipe(
      map(response => {
        if (response && response.user_id) {
          // Create user object based on the expected structure
          const user: User = {
            email: email,
            username: username,
            uid: response.user_id,
            avatarUrl: avatarUrl,
            avatarWidth: avatarWidth
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

  private getAvatarWidth(avatarUrl: string): number {
    const avatars = [
      { id: 1, url: '/avatars/avatar_1.png', width: 55 },
      { id: 2, url: '/avatars/avatar_2.png', width: 55 },
      { id: 3, url: '/avatars/avatar_3.png', width: 55 },
      { id: 4, url: '/avatars/avatar_4.png', width: 55 },
      { id: 5, url: '/avatars/avatar_5.png', width: 60 },
      { id: 6, url: '/avatars/avatar_6.png', width: 50 },
      { id: 7, url: '/avatars/avatar_7.png', width: 60 },
      { id: 8, url: '/avatars/avatar_8.png', width: 55 },
      { id: 9, url: '/avatars/avatar_9.png', width: 55 },
      { id: 10, url: '/avatars/avatar_10.png', width: 55 },
      { id: 11, url: '/avatars/avatar_11.png', width: 55 },
      { id: 12, url: '/avatars/avatar_12.png', width: 50 },
      { id: 13, url: '/avatars/avatar_13.png', width: 50 },
      { id: 14, url: '/avatars/avatar_14.png', width: 50 },
      { id: 15, url: '/avatars/avatar_15.png', width: 55 },
      { id: 16, url: '/avatars/avatar_16.png', width: 55 },
      { id: 17, url: '/avatars/avatar_17.png', width: 50 },
      { id: 18, url: '/avatars/avatar_18.png', width: 55 },
      { id: 19, url: '/avatars/avatar_19.png', width: 50 },
      { id: 20, url: '/avatars/avatar_20.png', width: 60 },
      { id: 21, url: '/avatars/avatar_21.png', width: 45 },
      { id: 22, url: '/avatars/avatar_22.png', width: 45 },
      { id: 23, url: '/avatars/avatar_23.png', width: 40 },
      { id: 24, url: '/avatars/avatar_24.png', width: 35 },
      { id: 25, url: '/avatars/avatar_25.png', width: 50 },
      { id: 26, url: '/avatars/avatar_26.png', width: 35 },
      { id: 27, url: '/avatars/avatar_27.png', width: 40 },
      { id: 28, url: '/avatars/avatar_28.png', width: 50 },
      { id: 29, url: '/avatars/avatar_29.png', width: 50 },
      { id: 30, url: '/avatars/avatar_30.png', width: 45 },
    ];

    const avatar = avatars.find(a => a.url === avatarUrl);
    return avatar ? avatar.width : 50;
  }
}
