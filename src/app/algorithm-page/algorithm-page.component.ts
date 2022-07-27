// import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExecutionService } from '../shared/execution.service';

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.css']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public exeService: ExecutionService) { }

  ngOnInit(): void {
  }

  algorithmData;

  firstRun: boolean = true;

  commandList: any[] = [];

  commandListCounter: number = 0;
  numCommands: number = 0;

  currentLine: number = 0;
  timeInBetween: number = 500;
  pause: Boolean = false;
  prevStep: number = 0;

  algorithm = new FormControl('');

  min = 1;
  max = 100;
  numLength: number;

  matrix: any[];
  row: any[];
  col: any[];

  originalMatrix: any[][];

  resultMatrix: any[][];

  descriptions = [];

  returnText = "Click play to run the program below!";

  animate = false;

  changeAlgorithm() {
    this.commandList = [];

    this.commandListCounter = 0;

    this.currentLine = 0;
    // this.timeInBetween = 500;
    this.pause = false;

    this.numLength = 3;

    this.matrix = [];
    this.originalMatrix = null;
    this.resultMatrix = null;
    this.row = [];
    this.col = [];

    this.firstRun = true;
    this.toggleAnimatePlay();

    this.returnText = "Click play to run the program below!";
  }

  toggleAnimateStop(){
    this.animate = true;
  }

  toggleAnimatePlay(){
    this.animate = false;
  }

  toggle() {
    if (this.firstRun) {
      var algorithmData = this.exeService.getExecutionFlow(this.algorithm.value, this.min, this.max, this.numLength);
      this.algorithmData = algorithmData;
      this.commandList = algorithmData["commands"];
      this.descriptions = algorithmData["descriptions"];
      this.originalMatrix = algorithmData["originalMatrix"];
      this.resultMatrix = algorithmData["results"];
      this.numCommands = this.commandList.length - 1;
      this.firstRun = false;

      this.getStepData();

      this.play()
    } else {
      if (this.pause) {
        this.pause = false;
        this.play()
      } else {
        this.pauseExecution();
      }
    }
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
    this.timeInBetween = 3050 - val;
  }

  formatSteps(val: number) {
    if (this.prevStep != this.commandListCounter) {
      this.prevStep = this.commandListCounter;
      this.pause = true;
    }

    this.commandListCounter = val;


    var command = this.commandList[this.prevStep];

    this.returnText = this.descriptions[this.commandListCounter];

    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "";

    this.colorLine();

  }

  async play(): Promise<void> {
    
    while (this.commandListCounter < this.commandList.length) {

      if (this.pause) {
        console.log("Paused at step " + (this.commandListCounter+1) + "!");
        console.log("Current Line: " + this.currentLine);
        this.toggleAnimatePlay();
        break;
      }

      this.toggleAnimateStop();

      this.colorLine();

      await this.sleep(this.timeInBetween);

      if (!this.pause) {
        if (!(this.commandListCounter >= this.commandList.length - 1)) {
          let a = document.getElementById("line" + this.currentLine);
          a.style.color = "";
          this.commandListCounter++;
        } else {
          // this.toggleAnimateStop();
          // console.log(this.animate);
          this.pause = true;
        }
      }

    }

  }

  restart() {
    this.pause = true;
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.commandListCounter = 0;
    this.currentLine = 1;
    this.returnText = this.descriptions[0];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.toggleAnimatePlay();
  }

  goToEnd() {
    this.pause = true;
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.commandListCounter = this.numCommands;


    var command = this.commandList[this.numCommands];

    this.returnText = this.descriptions[this.commandListCounter];

    this.currentLine = command["lineNumber"];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.toggleAnimatePlay();
  }

  pauseExecution() {
    if (this.commandListCounter < this.commandList.length-1) {
      this.pause = true;
      // this.toggleAnimatePlay();
    }
  }

  backStep() {
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";

    if (this.commandListCounter > 0) {
      this.commandListCounter--;
    }

    this.colorLine();

  }

  forwardStep() {

    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";

    if (this.commandListCounter < this.commandList.length-1) {
      this.commandListCounter++;
    }

    this.colorLine();

  }

  colorLine(): void {
    var command = this.commandList[this.commandListCounter];

    this.returnText = this.descriptions[this.commandListCounter];

    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "#37FF00";
    this.currentLine = command["lineNumber"];
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  getStepData(): void {
    for(let command of this.commandList) {
      this.matrix.push(command["matrix"]);
      this.row.push(command["row"]);
      this.col.push(command["col"]);
    }

  }
  

}
