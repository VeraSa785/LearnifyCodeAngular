import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  FormBuilder, FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MatDialog,MatDialogModule} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogComponent} from "./dialog/dialog.component";
import {FooterComponent} from "../footer/footer.component";

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
    MatDialogModule, FormsModule, NgOptimizedImage, FooterComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit {
  formGroup!: FormGroup;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

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
      'email': ['', [Validators.required, Validators.email]],
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
      // Extract values from the form controls
      const loginData = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };

      this.authService.login(loginData).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/lessons']); // Navigate on success
          } else {
            alert('Login failed');
          }
        },
        error: (error) => {
          alert('Login failed: ' + error.message); // Provide error feedback
        }
      });
    } else {
      alert('Please fill out the form correctly.'); // Alert if form is not valid
    }
  }
}
