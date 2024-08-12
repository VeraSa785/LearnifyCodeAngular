import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

interface Avatar {
  id: number;
  url: string;
  width: number;
}

@Component({
  selector: 'app-avatar-scroll',
  standalone: true,
  imports: [
    MatIconButton,
    NgClass,
    NgForOf,
    MatIcon,
    MatTooltip,
    NgStyle
  ],
  templateUrl: './avatar-scroll.component.html',
  styleUrl: './avatar-scroll.component.css'
})

export class AvatarScrollComponent {
  @Input() avatars: Avatar[] = [];
  @Input() currentAvatar: Avatar | null = null;
  @Output() currentAvatarChange = new EventEmitter<Avatar>();
  @Output() avatarSelect = new EventEmitter<Avatar>();

  selectAvatar(avatar: Avatar): void {
    this.currentAvatar = avatar;
    this.currentAvatarChange.emit(this.currentAvatar);
    this.avatarSelect.emit(avatar);
  }
}
