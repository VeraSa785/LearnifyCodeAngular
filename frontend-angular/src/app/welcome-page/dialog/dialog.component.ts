import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../auth.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {AvatarScrollComponent} from "./avatar-scroll/avatar-scroll.component";


interface Avatar {
  id: number;
  url: string;
  width: number;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    NgOptimizedImage,
    AvatarScrollComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  selectedAvatar: Avatar | null = null;
  avatars: Avatar[] = [
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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      avatar: ['']
    });

    this.form.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    // Initial check to set errors correctly on load
    this.updateErrorMessages();
  }

  onAvatarSelected(avatar: Avatar): void {
    this.selectedAvatar = avatar;
    this.form.get('avatar')?.setValue(avatar.url);
  }

  updateErrorMessages() {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const repeatPassword = this.form.get('repeatPassword')?.value;

    // this.form.get('username')?.setErrors(
    //   this.authService.usernameExists(username) ? { usernameExists: 'Username already exists' } : null
    // );
    //
    // this.form.get('email')?.setErrors(
    //   this.authService.emailExists(email) ? { emailExists: 'Email already exists' } : null
    // );

    if (password !== repeatPassword) {
      this.form.get('repeatPassword')?.setErrors({ passwordsMismatch: 'Passwords do not match' });
    } else {
      this.form.get('repeatPassword')?.setErrors(null);
    }

    if (password && password.length < 6) {
      this.form.get('password')?.setErrors({ minLength: 'Password must be at least 6 characters long' });
    }

    this.cdr.detectChanges();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.updateErrorMessages();
    if (this.form.valid) {
      const userData = this.form.value;
      this.authService.signUp(userData.username, userData.email, userData.password, userData.avatar, this.selectedAvatar!.width).subscribe({
        next: (res) => {
          console.log('User added successfully', res);
          this.dialogRef.close(userData);
          this.router.navigate(['/lessons']);
        },
        error: (err) => {
          console.error('Failed to add user', err);
        }
      });
    } else {
      console.log('Form contains errors:', this.form.errors);
    }
  }

  getError(el: string): string {
    const control = this.form.get(el);
    if (control?.hasError('required')) {
      return `${el.charAt(0).toUpperCase() + el.slice(1)} required`;
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    // if (control?.hasError('usernameExists')) {
    //   return 'Username already exists';
    // }
    // if (control?.hasError('emailExists')) {
    //   return 'Email already exists';
    // }
    if (control?.hasError('passwordsMismatch')) {
      return 'Passwords do not match';
    }
    if (control?.hasError('minLength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }
}
