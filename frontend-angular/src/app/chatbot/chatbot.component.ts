import { Component, Input, SimpleChanges } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @Input() codeReview!: { code: string, prompt: string };
  @Input() lessonContent!: string;
  @Input() lessonTopic!: string;

  chatMessages = [
    { role: 'assistant', content: 'Hello! let\'s learn something new today:' }
  ];

  userMessage = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['codeReview'] && this.codeReview) {
      this.sendPredefinedMessage('Review My Code', `${this.codeReview.prompt}\n\n${this.codeReview.code}`);
    }
    if (changes['lessonContent'] && this.lessonContent) {
      this.chatMessages.push({ role: 'assistant', content: this.lessonContent });
    }
    if (changes['lessonTopic'] && this.lessonTopic) {
      console.log('Lesson Topic Changed:', this.lessonTopic); // Debugging line
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatMessages.push({ role: 'user', content: this.userMessage });
      this.http.post<any>('https://minibackend-mzzo.onrender.com/chat', { message: this.userMessage }).subscribe({
        next: response => {
          this.chatMessages.push({ role: 'assistant', content: response.reply });
        },
        error: error => {
          console.error('Error:', error);
          this.chatMessages.push({ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' });
        }
      });
      this.userMessage = '';
    }
  }

  sendPredefinedMessage(displayMessage: string, actualMessage: string) {
    console.log('Sending Predefined Message:', displayMessage, actualMessage); // Debugging line
    this.chatMessages.push({ role: 'user', content: displayMessage });
    this.http.post<any>('https://minibackend-mzzo.onrender.com/chat', { message: actualMessage }).subscribe({
      next: response => {
        this.chatMessages.push({ role: 'assistant', content: response.reply });
      },
      error: error => {
        console.error('Error:', error);
        this.chatMessages.push({ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' });
      }
    });
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
