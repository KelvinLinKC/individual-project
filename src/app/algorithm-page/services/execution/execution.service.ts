import { Injectable } from '@angular/core';
import { HungarianService } from '../../algorithms/hungarian/hungarian.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  commandMap = {};
  commandList = {};

  serviceMap = {
    "hungarian": this.hunService
  }

  // add the services for any new algorithms here
  constructor(
    public hunService: HungarianService
  ) { }

  getExecutionFlow(algorithm: string, min: number, max: number,numLength: number): Object {
    let algorithmService = this.serviceMap[algorithm];
    this.commandMap = algorithmService.commandMap;
    
    let commandList = algorithmService.run(min, max, numLength);
    commandList["descriptions"] = this.generateDescriptions(commandList);

    return commandList;
  }

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
