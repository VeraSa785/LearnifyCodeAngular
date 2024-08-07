import { Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {LessonsPageComponent} from "./lessons-page/lessons-page.component";
import {ChatPageComponent} from "./chat-page/chat-page.component";
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [] = [
  {
    path: "",
    component: WelcomePageComponent
  },
  {
    path: 'lessons',
    component: LessonsPageComponent,
  },
  {
    path: 'chat',
    component: ChatPageComponent,
  }
];

export default routes;
