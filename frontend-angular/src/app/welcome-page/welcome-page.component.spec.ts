import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let authServiceStub: Partial<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceStub = {
      // login: (data: any) => true
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        WelcomePageComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElement = fixture.debugElement.query(By.css('.header-left h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Learnify');

    const codeElement = fixture.debugElement.query(By.css('.header-right h1'));
    expect(codeElement).toBeTruthy();
    expect(codeElement.nativeElement.textContent).toContain('Code');
  });

  it('should have a form with email and password fields', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should navigate to lessons on button click', () => {
    const navigateButton = fixture.debugElement.query(By.css('button.primary-styled-button'));
    navigateButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/lessons']);
  });

  it('should open the dialog on Sign up button click', () => {
    const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    const signUpButton = fixture.debugElement.query(By.css('button.secondary-styled-button'));
    signUpButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should have an image with ngSrc "two_persons.png"', () => {
    const imgElement = fixture.debugElement.query(By.css('img[ngSrc="two_persons.png"]'));
    expect(imgElement).toBeTruthy();
  });

  it('should display email validation error when email field is invalid', () => {
    const emailInput = component.formGroup.get('email');
    emailInput?.setValue('');
    emailInput?.markAsTouched();
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('.email-input mat-error'));
    expect(emailError.nativeElement.textContent).toContain('Email required');
  });

  it('should display password validation error when password field is invalid', () => {
    const passwordInput = component.formGroup.get('password');
    passwordInput?.setValue('');
    passwordInput?.markAsTouched();
    fixture.detectChanges();

    const passwordError = fixture.debugElement.query(By.css('.login-input-container mat-error'));
    expect(passwordError.nativeElement.textContent).toContain('Password required');
  });

  it('should disable the submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button.login-button'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should display the introductory text content', () => {
    const textContainer = fixture.debugElement.query(By.css('.text-container'));
    expect(textContainer).toBeTruthy();
    expect(textContainer.nativeElement.textContent).toContain('Empowering you to master algorithms and data structures');
    expect(textContainer.nativeElement.textContent).toContain('Try without logging in!');
  });
});
