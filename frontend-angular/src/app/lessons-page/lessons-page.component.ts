import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lessons-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    NgForOf,
    MatButton
  ],
  templateUrl: './lessons-page.component.html',
  styleUrl: './lessons-page.component.css'
})
export class LessonsPageComponent {

  lessons: any = [
    "Hash Maps",
    "Stacks and Queues",
    "Hashing and Hash Tables",
    "Dynamic Programming and Memoization",
    "Traversing graphs by row and column",
    "Rotating a Matrix",
    "DFS and BFS"
  ];

  constructor(private router: Router) { }

  goToChatPage(lesson: string): void {
    this.router.navigate(['/chat', { lesson: lesson }]);
  }
}
