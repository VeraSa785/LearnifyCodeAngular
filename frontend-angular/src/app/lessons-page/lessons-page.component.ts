import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import { title } from 'process';

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

  lessons = [
    { title: 'Hash Maps', query: 'hash' },
    { title: 'DFS and BFS', query: 'dfs' },
    { title: 'Stacks and Queues', query: 'stacks' },
    { title:  "Hashing and Hash Tables", query: 'Hashing'},
    { title:   "Dynamic Programming and Memoization", query: 'Dynamic'},
    { title: "Traversing a Matrix", query: 'Traversing'},
    { title: "Rotating a Matrix", query: 'Rotating'}
  ];

  constructor(private router: Router) { }

///lesson is a query
 getLessonContent(query: string, title: string): void {
   this.router.navigate(['/chat'], { queryParams: { query, title } });
}
}
