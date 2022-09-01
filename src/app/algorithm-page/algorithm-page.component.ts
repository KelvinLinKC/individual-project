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

  changeAlgorithm() {
    this.playback.firstRun = true;
    this.playback.resetPlaybackData();

    anime({
      targets: '.playback-block, .restart-button, .matrix-block, .code-block',
      easing: 'easeInOutQuint',
      translateY: [150, 0],
      opacity: [0, 1],
      duration: 800
    })
  }

  restartAlgorithm() {
    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "";
    this.playback.resetPlaybackData();
  }

}
