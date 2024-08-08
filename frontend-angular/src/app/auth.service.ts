import { Injectable } from '@angular/core';
import {LoginData} from "./welcome-page/welcome-page.component";
import {BehaviorSubject, delay, Observable, of} from "rxjs";

export interface User {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User|null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private users: User[] = [
    { username: 'john', email: 'john@example.com', password: 'john123', avatarUrl: '/avatars/avatar_1.png' },
    { username: 'anny', email: 'anny@example.com', password: 'anny123', avatarUrl: '/avatars/avatar_4.png' },
    { username: 'doe', email: 'doe@example.com', password: 'doe123', avatarUrl: '/avatars/avatar_7.png' }
  ];

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(loginData: LoginData): boolean {
    const user = this.users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  userExists(username: string, email: string): boolean {
    return this.users.some(u => u.username === username || u.email === email);
  }

  emailExists(email: string): boolean {
    return this.users.some(u => u.email === email);
  }

  usernameExists(username: string): boolean {
    return this.users.some(u => u.username === username);
  }

  addUser(username: string, email: string, password: string, avatarUrl: string): Observable<any> {
    const newUser = { username, email, password, avatarUrl };
    this.users.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return of(newUser).pipe(delay(1000));
  }
}
