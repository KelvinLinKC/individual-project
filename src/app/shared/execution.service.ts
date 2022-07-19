import { Injectable } from '@angular/core';
import { HungarianService } from './hungarian/hungarian.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  functionMap = {
    "simple": this.simpleFunction
  }

  commandMap = {
    "simple": {
        1: "Start a loop for 7 times and increment i on each loop",
        2: "Print i (%i%) to console.",
        3: "Checking if i (%i%) is equal to 5.",
        4: "i was equal to 5, so the program entered this block of code.",
        5: "i (%i%) wasn't equal to 5, so the program skipped the if block of code.",
        6: "Done!"
    },
    "hungarian": {

    }
  }

  commandList = [];

  constructor(public hunService: HungarianService) { }

  getExecutionFlow(algorithm: string, min: number, max: number,numLength: number): any[] {
    if(algorithm == "hungarian") {
      return [this.hungarianFunction(min, max, numLength), this.commandMap[algorithm]];
    }

    return [this.functionMap[algorithm](), this.commandMap[algorithm]];
  }

  simpleFunction(): any[] {
    console.log(this);
    this.commandList = [];
    this.commandList.push(1);
    for (let i=1; i<8; i++) {
      console.log(i);
      this.commandList.push({2: {"%i%": i}});
      this.commandList.push({3: {"%i%": i}});
      if (i == 5) {
        console.log("this is now 5!");
        this.commandList.push(4);
      } else {
        this.commandList.push({5: {"%i%": i}});
      }
    }
    this.commandList.push(6);
    return this.commandList;
  }

  hungarianFunction(min: number, max: number,numLength: number): any[] {
    console.log(this);
    console.log(this.commandList);
    this.commandList = this.hunService.hungarian(1, 100, 3);
    return this.commandList;
  }

}
