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
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

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
    MatDialogContent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  form!: FormGroup;

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
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    // Initial check to set errors correctly on load
    this.updateErrorMessages();
  }

  updateErrorMessages() {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const repeatPassword = this.form.get('repeatPassword')?.value;

    this.form.get('username')?.setErrors(
      this.authService.usernameExists(username) ? { usernameExists: 'Username already exists' } : null
    );

    this.form.get('email')?.setErrors(
      this.authService.emailExists(email) ? { emailExists: 'Email already exists' } : null
    );

    if (password !== repeatPassword) {
      this.form.get('repeatPassword')?.setErrors({ passwordsMismatch: 'Passwords do not match' });
    } else {
      this.form.get('repeatPassword')?.setErrors(null);
    }

    this.cdr.detectChanges();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.updateErrorMessages();
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      console.log('User data to be added:', { username, email, password });

      this.authService.addUser(username, email, password);
      console.log('User added successfully');
      this.dialogRef.close({ username, email, password });
      this.router.navigate(['/lessons']);
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
    if (control?.hasError('usernameExists')) {
      return 'Username already exists';
    }
    if (control?.hasError('emailExists')) {
      return 'Email already exists';
    }
    if (control?.hasError('passwordsMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}
