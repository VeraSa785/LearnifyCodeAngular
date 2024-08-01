import { Component } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
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
  chatMessages = [
    { role: 'assistant', content: 'Hello! How can I help you today?' },
    { role: 'assistant', content: 'Today\'s lesson DFS stands for Depth-First Search. It is a popular graph traversal algorithm used in computer science to explore and search through a graph or tree data structure. In DFS, the algorithm starts at a designated vertex and explores as far as possible along each branch before backtracking. It uses a stack data structure to keep track of the vertices that need to be explored next.DFS is commonly used in various applications, such as finding connected components, determining paths between nodes, and solving maze problems' }

  ];

  userMessage = '';  

  constructor(private http: HttpClient) {} 

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatMessages.push({ role: 'user', content: this.userMessage });
      this.http.post<any>('http://localhost:3000/chat', { message: this.userMessage }).subscribe({
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
    this.chatMessages.push({ role: 'user', content: displayMessage });
    this.http.post<any>('http://localhost:3000/chat', { message: actualMessage }).subscribe({
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
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
