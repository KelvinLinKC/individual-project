import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlaybackService } from './services/playback/playback.service';
declare var anime: any;

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.css']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    anime({
      targets: '.option-box',
      easing: 'easeInOutQuint',
      translateY: [-150, 0],
      opacity: [0, 1],
      duration: 1200
    })
  }

  algorithm = new FormControl('');
  numLength: number;

  changeAlgorithm() {
    console.log("here");
    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    this.numLength = 3;
    anime({
      targets: '.playback-block, .code-block',
      easing: 'easeInOutQuint',
      translateY: [150, 0],
      opacity: [0, 1],
      duration: 800
    })
  }

}
