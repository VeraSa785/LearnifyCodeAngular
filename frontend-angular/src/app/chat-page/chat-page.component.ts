import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { NgIf } from '@angular/common';
import {NavBarComponent} from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-chat-page',
  standalone: true,
    imports: [
        ChatbotComponent,
        CodeEditorComponent,
        NgIf,
        NavBarComponent
    ],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  currentLesson!: string;
  lessonId: string | null = '';
  lessonContent: string = '';
  codeReviewRequest!: { code: string, prompt: string };
  lessonTopic: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('query');
      const title = params.get('title');
      if (query && title) {
        this.currentLesson = title;
        this.lessonTopic = title;
        console.log('Lesson Topic:', this.lessonTopic); // Debugging line
        this.fetchLessonContent(query);
      }
    });
  }

  async fetchLessonContent(query: string) {
    try {
      const response = await firstValueFrom(this.http.get<any>(`https://learnifycode-backend.onrender.com/lessons/search?title=${query}`));
      console.log('API Response:', response); // Log response
      if (response.length > 0) {
        this.lessonContent = response[0].lesson.join('\n');
      } else {
        console.error('No lessons found');
      }
    } catch (error: any) {
      console.error('Error fetching lesson content:', error);
      console.error('Error status:', error.status);
      console.error('Error headers:', error.headers);
      console.error('Error body:', error.error);
    }
  }

  handleCodeReviewRequest(event: { code: string, prompt: string }) {
    this.codeReviewRequest = event;
  }
}
