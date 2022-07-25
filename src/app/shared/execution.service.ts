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
      1: "Start the algorithm with a created matrix.",
      2: "Find the smallest entry in each row, nRow = [%i%].",
      3: "Subtract nRow = [%i%] in each row from all the other entries in the row.",
      4: "Find the smallest entry in each column, nCol = [%i%].",
      5: "Subtract nCol = [%i%] in each row from all the other entries in the column.",
      6: "The minimal number of zeroes covered lines l = %i% in row %j% and column %k%.",
      7: "The l = %i% and n = %j%, check entry loop condition l < n",
      8: "The smallest uncovered entry s = %i%.",
      9: "Subtract s = %i% from all uncovered numbers and add to all cross-covered numbers.",
      10: "The minimal number of zeroes covered lines l = %i% in row = %j% and column = %k%.",
      11: "An optimal assignment is found and the result = %i%."
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

  getMonitorMatrixTable(): any[] {
    return this.hunService.matrixSet;
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
