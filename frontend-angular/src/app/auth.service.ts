import { Injectable } from '@angular/core';
import {LoginData} from "./welcome-page/welcome-page.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(loginData: LoginData) {
    console.log('Login Data:', loginData);
  //   TODO: add API request to server
  }
}
