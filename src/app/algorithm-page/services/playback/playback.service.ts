import { Injectable } from '@angular/core';
import { ExecutionService } from '../execution/execution.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  // algorithm data variables
  public algorithmData: Object;
  commandList: Array<Object>;
  currentCommand: Object;

  originalMatrix: any[][];
  resultMatrix: any[][];
  matrix: any[];
  row: any[];
  col: any[];
  selectedNumber: any[];
  selectedLine: any[];

  // playback variables
  firstRun: boolean = true;
  stepCounter: number;
  previousStepCounter: number;
  currentLine: number;
  numCommands: number;
  pause: boolean = true;
  speed: number = 500;

  description: string = "Click play to run the program below!";
  
  constructor(public exeService: ExecutionService) { }

  resetPlaybackData(): void {
    this.firstRun = true;
    this.stepCounter = 0;
    this.previousStepCounter = 0;
    this.currentLine = 0;
    this.pause = true;
    this.description = "Click play to run the program below!";

    this.originalMatrix = null;
    this.resultMatrix = null;
    this.matrix = [];
    this.row = [];
    this.col = [];
    this.selectedLine = [];
    this.selectedNumber = []; 

  }

  setAlgorithm(algorithm: string,  min: number, max: number,numLength: number) { 
    this.algorithmData = this.exeService.getExecutionFlow(algorithm, min, max, numLength);

    this.commandList = this.algorithmData["commands"];
    this.resetPlaybackData();
    this.originalMatrix = this.algorithmData["originalMatrix"];
    this.resultMatrix = this.algorithmData["results"];
    this.getStepData();

    this.numCommands = this.commandList.length-1;
    console.log(this.algorithmData);
    this.updateCurrentCommand();
    console.log(this.description);

  }

  setSpeed(milliseconds: number) {
    this.speed = milliseconds;
  }

  updateCurrentCommand(): void {
    if (this.previousStepCounter != this.stepCounter) {
      this.previousStepCounter = this.stepCounter;
    }

    this.currentCommand = this.algorithmData["commands"][this.stepCounter];
    this.description = this.algorithmData["descriptions"][this.stepCounter];
    this.currentLine = this.currentCommand["lineNumber"];
    if(this.originalMatrix != null) {
      this.highlightVariables()
    }
  }

  restart(): void {
    this.pause = true;
    this.uncolourCurrentLine();
    // unbolden
    this.stepCounter = 0;
    this.updateCurrentCommand();
    this.colourCurrentLine();
  }

  goToEnd(): void {
    this.pause = true;
    this.uncolourCurrentLine();
    // unbolden
    this.stepCounter = this.numCommands;
    this.updateCurrentCommand();
    this.colourCurrentLine();
  }

  backStep(): void {
    this.uncolourCurrentLine();
    if (this.stepCounter > 0) { this.stepCounter--; }
    this.updateCurrentCommand();
    this.colourCurrentLine(); 
  }

  forwardStep(): void {
    this.uncolourCurrentLine();
    if (this.stepCounter < this.numCommands) { this.stepCounter++; }
    this.updateCurrentCommand();
    this.colourCurrentLine();
  }

  async play(): Promise<void> {
    while (this.stepCounter < this.numCommands) {

      if (this.pause) {
        console.log("Paused at step " + (this.stepCounter) + "!");
        console.log("Current Line: " + this.currentLine);
        break;
      }

      this.colourCurrentLine();

      await this.sleep(this.speed);

      if (!this.pause) {
        // console.log(this.stepCounter + " | " + this.numCommands);
        this.uncolourCurrentLine();
        this.stepCounter++;
        this.updateCurrentCommand();
        if (this.stepCounter >= this.numCommands) {
          this.pause = true;
        }
      }

    }
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  uncolourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.color = "";
  }

  colourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.color = "#37FF00";
  }

  getStepData(): void {
    for(let command of this.commandList) {
      this.matrix.push(command["matrix"]);
      this.row.push(command["row"]);
      this.col.push(command["col"]);
    }
    console.log(this.commandList);
  }

  async highlightVariables(): Promise<void> {

    this.clearHighlight();

    await this.sleep(1);

    let highlightNumber = this.currentCommand["highlight"];
    let highlightRow = this.currentCommand["row"];
    let highlightCol = this.currentCommand["col"];

    for (let number of highlightNumber) {
      let a = document.getElementsByClassName("number" + number);
      for (let i = 0; i < a.length; i++) {
        a[i].setAttribute("style", "font-weight: bold; color: red;");
      }
      this.selectedNumber.push(number);
    }

    for (let i=0; i<this.originalMatrix.length; i++) {
      if(highlightRow[i]) {
        let className = "r" + i.toString();
        let a = document.getElementsByClassName(className);
        for (let i = 0; i < a.length; i++) {
          a[i].setAttribute("style", "background-color: lightblue;");
        }
        this.selectedLine.push(className);
      }

      if(highlightCol[i]) {
        let className = "c" + i.toString();
        let a = document.getElementsByClassName(className);
        for (let i = 0; i < a.length; i++) {
          a[i].setAttribute("style", "background-color: lightgreen;");
        }
        this.selectedLine.push(className);
      }

    }

  }

  clearHighlight(): void {

    for (let number of this.selectedNumber) {
      let a = document.getElementsByClassName("number" + number);
      for (let i = 0; i < a.length; i++) {
        a[i].setAttribute("style", "font-weight: normal; color: ;");
      }
    }

    this.selectedNumber = [];

    for (let line of this.selectedLine) {
      let a = document.getElementsByClassName(line);
      for (let i = 0; i < a.length; i++) {
        a[i].setAttribute("style", "background-color: ;");
      }
    }

    this.selectedLine = [];

  }
  
}
