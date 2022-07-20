import { Injectable } from '@angular/core';
import { HungarianService } from './hungarian/hungarian.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

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
      1: "line 1",
      2: "line 2",
      3: "line 3",
      4: "line 4",
      5: "line 5",
      6: "line 6",
      7: "line 7",
      8: "line 8",
      9: "line 9",
      10: "line 10",
      11: "line 11"
    }
  }

  commandList = [];

  constructor(public hunService: HungarianService) { }

  getExecutionFlow(algorithm: string, min: number, max: number,numLength: number): any[] {
    if(algorithm == "hungarian") {
      return [this.hungarianFunction(min, max, numLength), this.commandMap[algorithm]];
    }

    return [this.simpleFunction(), this.commandMap[algorithm]];
  }

  getMatrixTable(): any[][] {
    return this.hunService.m;
  }

  getOriginalMatrixTable(): any[][] {
    return this.hunService.originalMatrix;
  }

  getResultMatrixTable(): any[][] {
    return this.hunService.results;
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
