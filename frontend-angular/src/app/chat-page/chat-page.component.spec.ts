import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChatPageComponent } from './chat-page.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgIf } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import this

describe('ChatPageComponent Unit Test', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatPageComponent,  // Import the standalone component here
        HttpClientTestingModule,  // Import HttpClientTestingModule to provide HttpClient
        NgIf,
        ChatbotComponent,
        CodeEditorComponent,
        BrowserAnimationsModule  // Include this module
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => {
                const params: { [key: string]: string } = {
                  query: 'testQuery',
                  title: 'testTitle'
                };
                return params[key];
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ChatPageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentLesson and lessonTopic based on query params', () => {
    component.ngOnInit();
    expect(component.currentLesson).toBe('testTitle');
    expect(component.lessonTopic).toBe('testTitle');
  });

  it('should fetch lesson content with the correct query', () => {
    spyOn(component, 'fetchLessonContent').and.stub(); // Prevent actual call
    component.ngOnInit();
    expect(component.fetchLessonContent).toHaveBeenCalledWith('testQuery');
  });

  it('should correctly handle code review requests', () => {
    const codeReviewData = { code: 'testCode', prompt: 'testPrompt' };
    component.handleCodeReviewRequest(codeReviewData);
    expect(component.codeReviewRequest).toEqual(codeReviewData);
  });


});
