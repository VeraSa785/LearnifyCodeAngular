import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NavBarComponent} from "../navigation-bar/navigation-bar.component";
import {AuthService} from "../auth.service";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-lessons-page',
  standalone: true,
    imports: [
        NgOptimizedImage,
        MatCard,
        MatCardContent,
        NgForOf,
        MatButton,
        MatIcon,
        MatToolbar,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatIconButton,
        NavBarComponent,
        NgIf,
        FooterComponent
    ],
  templateUrl: './lessons-page.component.html',
  styleUrl: './lessons-page.component.css'
})
export class LessonsPageComponent implements OnInit {
  isLoggedIn: boolean = false;

  allLessons = [
    { title: "Hashing and Hash Tables", query: 'Hashing'},
    { title: "Dynamic Programming and Memoization", query: 'Dynamic'},
    { title: 'DFS and BFS', query: 'dfs' },
    { title: 'Hash Maps', query: 'hash' },
    { title: 'Stacks and Queues', query: 'stacks' },
    { title: "Traversing a Matrix", query: 'Traversing'},
    { title: "Rotating a Matrix", query: 'Rotating'}
  ];

  lessons: any[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.lessons = isLoggedIn ? this.allLessons : this.allLessons.slice(0, 3);
    })
  }

///lesson is a query
 getLessonContent(query: string, title: string): void {
   this.router.navigate(['/chat'], { queryParams: { query, title } });
  }
}
