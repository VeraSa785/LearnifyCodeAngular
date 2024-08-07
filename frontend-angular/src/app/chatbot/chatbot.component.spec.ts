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
        BrowserAnimationsModule, // Import BrowserAnimationsModule here
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with two initial messages', () => {
    expect(component.chatMessages.length).toBe(2);
    expect(component.chatMessages[0].content).toContain('Hello! let\'s learn something new today:');
    expect(component.chatMessages[1].content).toContain('Today\'s lesson DFS stands for Depth-First Search.');
  });

  it('should send a new message and receive a response', () => {
    component.userMessage = 'Test message';
    component.sendMessage();
    fixture.detectChanges();

    const req = httpTestingController.expectOne('http://localhost:3000/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Response from chatbot' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    expect(messages.length).toBe(4);
    expect(messages[2].nativeElement.textContent).toContain('Test message');
    expect(messages[3].nativeElement.textContent).toContain('Response from chatbot');
  });

  it('should handle predefined message', () => {
    // Initially, there are 2 messages
    expect(component.chatMessages.length).toBe(2);

    component.sendPredefinedMessage('Display message', 'Actual message');
    fixture.detectChanges();

    const req = httpTestingController.expectOne('http://localhost:3000/chat');
    expect(req.request.method).toEqual('POST');
    req.flush({ reply: 'Variable predefined response' });

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('.messages-list mat-list-item'));
    messages.forEach((msg, index) => {
      console.log(`Message ${index}: ${msg.nativeElement.textContent}`);
    });
    expect(messages.length).toBe(4); // 2 initial + 1 user + 1 response
    expect(messages[2].nativeElement.textContent).toContain('Display message');
    expect(messages[3].nativeElement.textContent).toBeTruthy(); // Check that the response is present
  });
});
