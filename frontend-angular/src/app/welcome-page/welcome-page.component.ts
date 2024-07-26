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
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogComponent} from "./dialog/dialog.component";

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatDivider, MatChipSet, MatChip, MatButton, MatAnchor, MatIcon, MatMiniFabButton, MatFabButton, MatIconButton, MatFormField, MatLabel, MatInput, MatFabAnchor, ReactiveFormsModule, NgOptimizedImage, MatCard, FormsModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  loginData: LoginData = {
    email: '',
    password: ''
  };

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        username: this.username,
        email: this.email,
        password: this.password,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.username = result;
      this.email = result;
      this.password = result;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const success = this.authService.login(this.loginData);
      if (success) {
        this.router.navigate(['/lessons']);
      } else {
        alert('Invalid email or password');
      }
      }
    }
}
