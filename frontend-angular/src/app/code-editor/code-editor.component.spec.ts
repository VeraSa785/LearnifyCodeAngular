import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CodeEditorComponent } from './code-editor.component';
import { PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CodeEditorComponent,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load code-editor', () => {
    expect(component).toBeTruthy();
  });

  
  it('should emit codeReviewRequest event with the correct code and prompt', fakeAsync(() => {
    // Arrange
    const expectedCode = `print('hello world')`;
    const expectedPrompt = 'Please review my code and point out what I did good and next steps to master that topic.';
    spyOn(component.codeReviewRequest, 'emit');
  
    // Act: Call ngAfterViewInit to initialize editor
    component.ngAfterViewInit();
    tick(1000); // Wait for the editor to initialize and for any setTimeout in ngAfterViewInit
  
    // Act: Call reviewCode to emit the event
    component.reviewCode();
    tick(5000); // Simulate the 5 seconds delay
  
    // Assert that the event was emitted with the correct data
    expect(component.codeReviewRequest.emit).toHaveBeenCalledWith({ code: expectedCode, prompt: expectedPrompt });
  }));
  
});
