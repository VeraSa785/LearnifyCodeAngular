import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChatPageComponent } from './chat-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ChatPageComponent
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the ChatbotComponent', () => {
    const chatbotElement = fixture.debugElement.query(By.directive(ChatbotComponent));
    expect(chatbotElement).toBeTruthy();
  });

  it('should contain the CodeEditorComponent', () => {
    const codeEditorElement = fixture.debugElement.query(By.directive(CodeEditorComponent));
    expect(codeEditorElement).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('testTitle');
  });
});
