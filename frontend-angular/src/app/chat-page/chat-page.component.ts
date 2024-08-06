import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatbotComponent} from "../chatbot/chatbot.component";

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatbotComponent
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent implements OnInit {
  currentLesson!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentLesson = params['lesson'];
    });
  }
}
