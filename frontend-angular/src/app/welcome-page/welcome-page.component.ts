import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MatDialog,MatDialogModule} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogComponent} from "./dialog/dialog.component";

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule, FormsModule, NgOptimizedImage],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  navigateToLessons(): void {
    this.router.navigate(['/lessons']);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  getError(el: string): string {
    switch (el) {
      case 'email':
        if (this.formGroup.get('email')?.hasError('required')) {
          return 'Email required';
        } else if (this.formGroup.get('email')?.hasError('email')) {
          return 'Invalid email format';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
    return '';
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User data:', result);
      }
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const loginData = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };
      if (this.authService.login(loginData)) {
        this.router.navigate(['/lessons']);
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
