import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatDivider, MatChipSet, MatChip, MatButton, MatAnchor, MatIcon, MatMiniFabButton, MatFabButton, MatIconButton, MatFormField, MatLabel, MatInput, MatFabAnchor],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  title = 'Learnify Code';
}
