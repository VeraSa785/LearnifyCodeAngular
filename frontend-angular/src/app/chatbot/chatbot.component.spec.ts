import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ChatbotComponent } from './chatbot.component';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        ChatbotComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create chatbot component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an initial message', () => {
    expect(component.chatMessages.length).toBe(1);
    expect(component.chatMessages[0].content).toContain("Hello! let's learn something new today:");
  });

  it('should send a new message and receive a response', () => {
    component.userMessage = 'Test message';
    component.sendMessage();
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://minibackend-mzzo.onrender.com/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Response from chatbot' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    expect(messages.length).toBe(3); // 1 initial + 1 user + 1 response
    expect(messages[1].nativeElement.textContent).toContain('Test message');
    expect(messages[2].nativeElement.textContent).toContain('Response from chatbot');
  });

  it('should handle predefined message', () => {
    component.sendPredefinedMessage('Display message', 'Actual message');
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://minibackend-mzzo.onrender.com/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Variable predefined response' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    expect(messages.length).toBe(3); // 1 initial + 1 user + 1 response
    expect(messages[1].nativeElement.textContent).toContain('Display message');
    expect(messages[2].nativeElement.textContent).toContain('Variable predefined response');
  });

  it('should update messages when lessonContent changes', () => {
    component.lessonContent = "New lesson content";
    component.ngOnChanges({ lessonContent: { currentValue: "New lesson content", previousValue: "", firstChange: true, isFirstChange: () => true } });
    fixture.detectChanges();

    expect(component.chatMessages.length).toBe(2); // 1 initial + 1 lessonContent
    expect(component.chatMessages[1].content).toContain('New lesson content');
  });

  it('should update messages when codeReview changes', () => {
    const codeReview = { code: 'Sample code', prompt: 'Sample prompt' };
    component.codeReview = codeReview;
    component.ngOnChanges({ codeReview: { currentValue: codeReview, previousValue: "", firstChange: true, isFirstChange: () => true } });
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://minibackend-mzzo.onrender.com/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Review response' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    expect(messages.length).toBe(3); // 1 initial + 1 user + 1 response
    expect(messages[1].nativeElement.textContent).toContain('Review My Code');
    expect(messages[2].nativeElement.textContent).toContain('Review response');
  });

  it('should send a message when Enter key is pressed', () => {
    const inputField = fixture.debugElement.query(By.css('input[matInput]')).nativeElement;
    component.userMessage = 'Test Enter key message';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    inputField.dispatchEvent(event);
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://minibackend-mzzo.onrender.com/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Response from chatbot' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    expect(messages.length).toBe(3); // 1 initial + 1 user + 1 response
    expect(messages[1].nativeElement.textContent).toContain('Test Enter key message');
    expect(messages[2].nativeElement.textContent).toContain('Response from chatbot');
  });
});
