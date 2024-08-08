import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsPageComponent } from './lessons-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LessonsPageComponent', () => {
  let component: LessonsPageComponent;
  let fixture: ComponentFixture<LessonsPageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        LessonsPageComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create lessons-page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an image with ngSrc "green_person.png"', () => {
    const imgElement = fixture.debugElement.query(By.css('img[ngSrc="green_person.png"]'));
    expect(imgElement).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElement = fixture.debugElement.query(By.css('.main-left-container h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Our Lessons');
  });

  it('should have lesson buttons', () => {
    const lessonButtons = fixture.debugElement.queryAll(By.css('.lessons-buttons button'));
    expect(lessonButtons.length).toBe(component.lessons.length);
    lessonButtons.forEach((button, index) => {
      expect(button.nativeElement.textContent).toContain(component.lessons[index].title);
    });
  });

  it('should navigate to the correct lesson on button click', () => {
    const lessonButtons = fixture.debugElement.queryAll(By.css('.lessons-buttons button'));
    lessonButtons.forEach((button, index) => {
      button.triggerEventHandler('click', null);
      const lesson = component.lessons[index];
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/chat'], { queryParams: { query: lesson.query, title: lesson.title } });
    });
  });
});
