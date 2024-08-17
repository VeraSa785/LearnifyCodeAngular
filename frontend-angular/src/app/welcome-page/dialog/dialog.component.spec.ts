import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth.service';
import { of } from 'rxjs';

// Define User interface here if not imported from another file
interface User {
  username: string;
  email: string;
  uid: string;
  avatarUrl: string;
  avatarWidth: number;
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientTestingModule, // Include this in your test module
        DialogComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        AuthService // Provide AuthService in the testing module
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.form.contains('username')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('repeatPassword')).toBeTrue();
    expect(component.form.contains('avatar')).toBeTrue();
  });

  it('should display avatars', () => {
    const avatars = fixture.debugElement.queryAll(By.css('.avatar-selection'));
    expect(component.avatars.length).toBe(30);
  });

  it('should validate password and repeat password fields correctly', () => {
    const passwordControl = component.form.get('password');
    const repeatPasswordControl = component.form.get('repeatPassword');

    passwordControl?.setValue('password1');
    repeatPasswordControl?.setValue('password2');
    fixture.detectChanges();

    expect(repeatPasswordControl?.errors).toEqual({ passwordsMismatch: 'Passwords do not match' });

    repeatPasswordControl?.setValue('password1');
    fixture.detectChanges();

    expect(repeatPasswordControl?.errors).toBeNull();
  });

  it('should close dialog with form data on successful submission', () => {
    const validUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      repeatPassword: 'password123',
      avatar: component.avatars[0].url
    };

    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      uid: '12345',
      avatarUrl: '/avatars/avatar_1.png',
      avatarWidth: 55
    };

    component.form.setValue(validUserData);
    component.selectedAvatar = component.avatars[0];

    const authServiceSpy = spyOn(component['authService'], 'signUp').and.returnValue(of(mockUser));

    component.onOk();
    fixture.detectChanges();

    expect(authServiceSpy).toHaveBeenCalledWith(
      validUserData.username,
      validUserData.email,
      validUserData.password,
      validUserData.avatar,
      component.selectedAvatar!.width
    );

    expect(matDialogRefSpy.close).toHaveBeenCalledWith(validUserData);
  });

  it('should not close dialog if form is invalid', () => {
    const invalidUserData = {
      username: '',
      email: 'invalidemail',
      password: 'short',
      repeatPassword: 'short',
      avatar: ''
    };

    component.form.setValue(invalidUserData);

    component.onOk();
    fixture.detectChanges();

    expect(matDialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close dialog when cancel is clicked', () => {
    component.onCancel();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

});
