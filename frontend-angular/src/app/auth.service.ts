import { Injectable } from '@angular/core';
import {LoginData} from "./welcome-page/welcome-page.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'john', email: 'john@example.com', password: 'john123' },
    { username: 'anny', email: 'jane@example.com', password: 'anny123' },
    { username: 'doe', email: 'doe@example.com', password: 'doe123' }
  ];

  login(loginData: LoginData) {
    console.log('Login Data:', loginData);
  //   TODO: add API request to server
    const user = this.users.find(u => u.email === loginData.email && u.password === loginData.password);
    return !!user; // Return true if user is found, otherwise false
  }
}
