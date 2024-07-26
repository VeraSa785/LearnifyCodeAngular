import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {AuthService} from "../auth.service";

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatDivider, MatChipSet, MatChip, MatButton, MatAnchor, MatIcon, MatMiniFabButton, MatFabButton, MatIconButton, MatFormField, MatLabel, MatInput, MatFabAnchor, ReactiveFormsModule, NgOptimizedImage, MatCard, FormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  loginData: LoginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.loginData);
    }
  }
}
