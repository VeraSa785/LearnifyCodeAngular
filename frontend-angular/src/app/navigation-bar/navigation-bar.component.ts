import { Component } from '@angular/core';
import {AuthService, User} from "../auth.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {async, Observable} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIf,
    MatIcon,
    MatMenuItem,
    MatMenu,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    FormsModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavBarComponent {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  protected readonly async = async;
}
