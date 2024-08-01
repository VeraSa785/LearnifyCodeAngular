import { Injectable } from '@angular/core';
import {LoginData} from "./welcome-page/welcome-page.component";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'john', email: 'john@example.com', password: 'john123' },
    { username: 'anny', email: 'anny@example.com', password: 'anny123' },
    { username: 'doe', email: 'doe@example.com', password: 'doe123' }
  ];

  login(loginData: LoginData) {
    console.log('Login Data:', loginData);
  //   TODO: add API request to server
    const user = this.users.find(u => u.email === loginData.email && u.password === loginData.password);
    return !!user; // Return true if user is found, otherwise false
  }

  // TODO: implement logout

  // maybe to remove, not sure about this lind of validation
  userExists(username: string, email: string): boolean {
    return this.users.some(u => u.username === username || u.email === email);
  }

  emailExists(email: string): boolean {
    return this.users.some(u => u.email === email);
  }

  usernameExists(username: string): boolean {
    return this.users.some(u => u.username === username);
  }

  // addUser(username: string, email: string, password: string): void {
  //   this.users.push({ username, email, password });
  // }
  addUser(username: string, email: string, password: string): Observable<any> {
    // Simulate a server response delay
    return of(this.users.push({ username, email, password })).pipe(delay(1000));
  }
}
