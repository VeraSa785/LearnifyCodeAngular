import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './navigation-bar.component';
import { AuthService, User } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    authServiceSpy.currentUser = of(null); // Start with no user logged in

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NavBarComponent, // Import NavBarComponent as a standalone component
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NavBar component', () => {
    expect(component).toBeTruthy();
  });
 

  it('should apply background color passed as input', () => {
    component.backgroundColor = 'blue';
    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;
    expect(toolbar.style.backgroundColor).toBe('blue');
  });
});
