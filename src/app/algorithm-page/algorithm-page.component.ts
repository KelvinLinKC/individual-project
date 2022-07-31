import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExecutionService } from './services/execution/execution.service';
import { PlaybackService } from './services/playback/playback.service';

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.css']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public exeService: ExecutionService, public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  // algorithmData;

  // firstRun: boolean = true;

  // commandList: any[] = [];

  // commandListCounter: number = 0;
  // numCommands: number = 0;

  // currentLine: number = 0;
  // timeInBetween: number = 500;
  // pause: Boolean = false;
  // prevStep: number = 0;

  algorithm = new FormControl('');

  min = 1;
  max = 100;
  numLength = 3;

  // matrix: any[];
  // row: any[];
  // col: any[];

  // selectedNumber: any[];
  // selectedLine: any[];

  // descriptions = [];

  // returnText = "Click play to run the program below!";

  // animate = false;

  changeAlgorithm() {
    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    // this.commandList = [];

    // this.commandListCounter = 0;

    // this.currentLine = 0;
    
    // this.pause = false;

    this.numLength = 3;

    // this.matrix = [];
    // this.row = [];
    // this.col = [];

    // this.selectedLine = [];
    // this.selectedNumber = []; 

    // this.firstRun = true;
    // this.animate = true;

    // this.returnText = "Click play to run the program below!";
  }

  toggle() {
    if (this.playback.firstRun) {
      this.playback.setAlgorithm(this.algorithm.value, this.min, this.max, this.numLength);
      this.playback.firstRun = false;
      this.playback.pause = false;
      // this.getStepData();
      this.playback.play();
    } else {
      if (this.playback.pause) {
        this.playback.pause = false;
        this.playback.play();
      } else {
        this.playback.pause = true;
      }
    }

    // if (this.firstRun) {
    //   this.playback.setAlgorithm(this.algorithm.value, this.min, this.max, this.numLength);
    //   var algorithmData = this.exeService.getExecutionFlow(this.algorithm.value, this.min, this.max, this.numLength);
    //   this.algorithmData = algorithmData;
    //   this.commandList = algorithmData["commands"];
    //   this.descriptions = algorithmData["descriptions"];
    //   this.originalMatrix = algorithmData["originalMatrix"];
    //   this.resultMatrix = algorithmData["results"];
    //   this.numCommands = this.commandList.length - 1;
    //   this.firstRun = false;

    //   this.getStepData();

    //   this.playback.play();
    // } else {
    //   if (this.playback.pause) {
    //     this.playback.pause = false;
    //     this.playback.play();
    //   } else {
    //     this.pauseExecution();
    //   }
    // }
  }

  formatLabel(value: number) {

    // pause
    value = 3050 - value;
    // play? (maybe not cause so many changes to this.timeInBetween value)

    if (value >= 1000) {
      return Math.round(value / 1000) + 's';
    }

    return value;
  }

  updateSpeed(val: number): void {
    this.playback.speed = 3050 - val;
  }

  formatSteps(val: number) {
    if (this.playback.previousStepCounter != this.playback.stepCounter) {
      this.playback.previousStepCounter = this.playback.stepCounter;
    }

    this.playback.pause = true;

    this.playback.stepCounter = val;


    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "";

    this.playback.updateCurrentCommand();
    // this.highlightVariables();
    this.playback.colourCurrentLine();

  }

  // async play(): Promise<void> {
    
  //   while (this.commandListCounter < this.commandList.length) {

  //     if (this.pause) {
  //       console.log("Paused at step " + (this.commandListCounter+1) + "!");
  //       console.log("Current Line: " + this.currentLine);
  //       this.toggleAnimatePlay();
  //       break;
  //     }

  //     this.toggleAnimateStop();

  //     this.colorLine();

  //     await this.sleep(this.timeInBetween);

  //     if (!this.pause) {
  //       if (!(this.commandListCounter >= this.commandList.length - 1)) {
  //         let a = document.getElementById("line" + this.currentLine);
  //         a.style.color = "";
  //         this.commandListCounter++;
  //       } else {
  //         // this.toggleAnimateStop();
  //         // console.log(this.animate);
  //         this.pause = true;
  //       }
  //     }

  //     if (this.algorithm.value == "hungarian") {
  //       this.highlightVariables();
  //     }

  //   }

  // }

  // restart() {
  //   this.playback.restart();
    // this.pause = true;
    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";
    // this.clearHighlight();
    // this.commandListCounter = 0;
    // this.currentLine = 1;
    // this.returnText = this.descriptions[0];
    // a = document.getElementById("line" + this.currentLine);
    // a.style.color = "#37FF00";
  // }

  // goToEnd() {
  //   this.playback.goToEnd();
    // this.pause = true;
    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";
    // this.commandListCounter = this.numCommands;


    // var command = this.commandList[this.numCommands];

    // this.returnText = this.descriptions[this.commandListCounter];

    // this.currentLine = command["lineNumber"];
    // a = document.getElementById("line" + this.currentLine);
    // a.style.color = "#37FF00";
  //   this.highlightVariables();
  // }

  // pauseExecution() {
  //   if (this.playback.stepCounter < this.playback.numCommands) {
  //     this.playback.pause = true;
  //   }
  // }

  // backStep() {
  //   this.playback.backStep();

  //   this.highlightVariables();

  // }

  // forwardStep() {

    // this.playback.forwardStep();

    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";

    // if (this.commandListCounter < this.commandList.length-1) {
    //   this.commandListCounter++;
    // }

    // this.highlightVariables();
    // this.colorLine();

  // }

  // colorLine(): void {
  //   var command = this.commandList[this.commandListCounter];

  //   this.returnText = this.descriptions[this.commandListCounter];

  //   let a = document.getElementById("line" + command["lineNumber"]);
  //   a.style.color = "#37FF00";
  //   this.currentLine = command["lineNumber"];
  // }

  // async sleep(msec: number) {
  //   return new Promise(resolve => setTimeout(resolve, msec));
  // }

  // getStepData(): void {
  //   for(let command of this.commandList) {
  //     this.matrix.push(command["matrix"]);
  //     this.row.push(command["row"]);
  //     this.col.push(command["col"]);
  //   }
  //   console.log(this.commandList);
  // }

  // async highlightVariables(): Promise<void> {

  //   this.clearHighlight();

  //   await this.sleep(1);

  //   var command = this.commandList[this.commandListCounter];
  //   let highlightNumber = command["highlight"];
  //   let highlightRow = command["row"];
  //   let highlightCol = command["col"];

  //   for (let number of highlightNumber) {
  //     let a = document.getElementsByClassName("number" + number);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: bold; color: red;");
  //     }
  //     this.selectedNumber.push(number);
  //   }

  //   for (let i=0; i<this.numLength; i++) {
  //     if(highlightRow[i]) {
  //       let className = "r" + i.toString();
  //       let a = document.getElementsByClassName(className);
  //       for (let i = 0; i < a.length; i++) {
  //         a[i].setAttribute("style", "background-color: lightblue;");
  //       }
  //       this.selectedLine.push(className);
  //     }

  //     if(highlightCol[i]) {
  //       let className = "c" + i.toString();
  //       let a = document.getElementsByClassName(className);
  //       for (let i = 0; i < a.length; i++) {
  //         a[i].setAttribute("style", "background-color: lightgreen;");
  //       }
  //       this.selectedLine.push(className);
  //     }

  //   }

  // }

  // clearHighlight(): void {

  //   for (let number of this.selectedNumber) {
  //     let a = document.getElementsByClassName("number" + number);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: normal; color: ;");
  //     }
  //   }

  //   this.selectedNumber = [];

  //   for (let line of this.selectedLine) {
  //     let a = document.getElementsByClassName(line);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "background-color: ;");
  //     }
  //   }

  //   this.selectedLine = [];

  // }
  

}
