
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymLeader } from '../hoenn-leader.service';

@Component({
  selector: 'app-leader-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-info.html',
  styleUrls: ['./leader-info.css']
})
export class LeaderInfo {

  @Input({ required: true }) leader!: GymLeader;

  alertIntro(intro: string) {
    alert(intro);
  }
}