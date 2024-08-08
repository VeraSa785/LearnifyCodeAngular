import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CodeEditorComponent } from './code-editor.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { EditorView } from '@codemirror/view';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        NoopAnimationsModule,
        CodeEditorComponent
      ],
      providers: [
        { provide: DOCUMENT, useValue: document }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    component.codeReviewRequest = new EventEmitter(); // Initialize the EventEmitter

    // Mock the EditorView and its methods
    component['editorView'] = {
      state: {
        doc: {
          toString: () => "print('hello world')"
        }
      }
    } as EditorView;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit codeReviewRequest with correct payload when reviewCode is called', () => {
    spyOn(component.codeReviewRequest, 'emit');
    component.reviewCode();
    expect(component.codeReviewRequest.emit).toHaveBeenCalledWith({
      code: "print('hello world')",
      prompt: 'Please review my code and point out what I did good and next steps to master that topic.'
    });
  });

  it('should have a review button', () => {
    const button = fixture.debugElement.query(By.css('.codereview-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Review my code');
  });

  it('should call reviewCode when the review button is clicked', () => {
    spyOn(component, 'reviewCode');
    const button = fixture.debugElement.query(By.css('.codereview-button'));
    button.triggerEventHandler('click', null);
    expect(component.reviewCode).toHaveBeenCalled();
  });
});
