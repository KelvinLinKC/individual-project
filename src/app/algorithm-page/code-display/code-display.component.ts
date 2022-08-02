import { Component, Input, OnInit } from '@angular/core';
import { PlaybackService } from '../services/playback/playback.service';

@Component({
  selector: 'code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {

  @Input() algorithm: string;

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

}
