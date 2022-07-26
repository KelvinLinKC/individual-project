import { Injectable } from '@angular/core';
import { HungarianService } from './hungarian/hungarian.service';
import { SimpleService } from './simple/simple.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  commandMap = {};
  commandList = {};

  serviceMap = {
    "simple": this.simpleService,
    "hungarian": this.hunService
  }

  // add the services for any new algorithms here
  constructor(
    public simpleService: SimpleService,
    public hunService: HungarianService
  ) { }

  getExecutionFlow(algorithm: string, min: number, max: number,numLength: number): Object {
    let algorithmService = this.serviceMap[algorithm];
    this.commandMap = algorithmService.commandMap;
    
    let commandList = algorithmService.run(min, max, numLength);
    commandList["descriptions"] = this.generateDescriptions(commandList);

    return commandList;
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

  // simpleFunction(): Object {
  //   let commandList = [];
  //   this.commandList = [];
  //   commandList.push(1);
  //   for (let i=1; i<8; i++) {
  //     console.log(i);
  //     commandList.push({2: {"%i%": i}});
  //     commandList.push({3: {"%i%": i}});
  //     if (i == 5) {
  //       console.log("this is now 5!");
  //       commandList.push(4);
  //     } else {
  //       commandList.push({5: {"%i%": i}});
  //     }
  //   }
  //   commandList.push(6);
  //   this.commandList["commands"] = commandList;
  //   return this.commandList;
  // }

  // hungarianFunction(min: number, max: number,numLength: number): Object {
  //   console.log(this);
  //   console.log(this.commandList);
  //   this.commandList = this.hunService.hungarian(min, max, numLength);
  //   this.commandList["descriptions"] = this.generateDescriptions();
  //   return this.commandList;
  // }

  // --------------------------------------------------------- FUNCTIONS TO GENERATE LINE DESCRIPTIONS

  generateDescriptions(commandList: Object): Object {
    let descriptions = [];

    for (let step of commandList["commands"]) {

      let lineNumber = step["lineNumber"];
      let stepVariables = step["stepVariables"];

      if (stepVariables) {
        descriptions.push(this.generateMessage(lineNumber, stepVariables));
      } else {
        descriptions.push(this.commandMap[lineNumber]);
      }
    }

    return descriptions;
  }

  generateMessage(commandNum: number, replacements: Object): string {

    var str = this.commandMap[commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all: string | number) {
      return replacements[all] || all;
    });

    return str;
  }

  
}
