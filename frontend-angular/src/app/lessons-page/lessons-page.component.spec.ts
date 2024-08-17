import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsPageComponent } from './lessons-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('LessonsPageComponent', () => {
  let component: LessonsPageComponent;
  let fixture: ComponentFixture<LessonsPageComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), LessonsPageComponent],
      providers: [{ provide: AuthService, useValue: authSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should display only 3 lessons if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(of(false));

    fixture.detectChanges();

    expect(component.lessons.length).toBe(3);
    const lessonButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(lessonButtons.length).toBe(4);
  });

  it('should display all lessons if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(of(true));

    fixture.detectChanges();

    expect(component.lessons.length).toBe(component.allLessons.length);
    const lessonButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(lessonButtons.length).toBe(component.allLessons.length+1);
  });


  it('should show login message when not logged in', () => {
    authService.isLoggedIn.and.returnValue(of(false));
    fixture.detectChanges();
    const loginMessage = fixture.debugElement.query(By.css('h2'));
    expect(loginMessage.nativeElement.textContent).toContain('Login to see more lessons!');
  });
});
