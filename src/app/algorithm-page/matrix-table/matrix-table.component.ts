import { Component, Input, OnInit } from '@angular/core';
import { PlaybackService } from '../services/playback/playback.service';

@Component({
  selector: 'matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.css']
})
export class MatrixTableComponent implements OnInit {

  @Input() algorithm: string;

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

}
