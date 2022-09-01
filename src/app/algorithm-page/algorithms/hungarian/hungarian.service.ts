import { Injectable } from '@angular/core';
import { Hungarian } from './hungarian.interface';

@Injectable({
  providedIn: 'root'
})
export class HungarianService {

  originalMatrix: number[][];
  m: number[][];

  maxSize: number = Number.MAX_SAFE_INTEGER;
  n: number;
  rowCovered: boolean[] = [];
  colCovered: boolean[] = [];
  numberHighlight: string[];
  results:number[][]= [];
  stable: boolean = false;
  commandList = {
    originalMatrix: null,
    results: null,
    commands: []
  };

  commandMap = {
    1: "Start the algorithm with a created matrix.",
    2: "Find the smallest entry in each row, nRow = [%rowMin%].",
    3: "Subtract nRow = [%rowMin%] in each row from all the other entries in the row.",
    4: "Find the smallest entry in each column, nCol = [%colMin%].",
    5: "Subtract nCol = [%colMin%] in each column from all the other entries in the column.",
    6: "The minimal number of zeroes covered lines l = %line% in row %row% and column %col%.",
    7: "The l = %line% and n = %n%, check entry loop condition l < n",
    8: "The smallest uncovered entry s = %min%.",
    9: "Subtract s = %min% from all uncovered numbers and add to all cross-covered numbers.",
    10: "The minimal number of zeroes covered lines l = %line% in row %row% and column %col%.",
    11: "An optimal assignment is found and the result = %result%."
  };


  firstloop = true;
  
  steps = {
      1: this.step1,
      2: this.step2,
      3: this.step3,
      4: this.step4,
      5: this.step5,
      6: 'Done'
  };

  constructor() { }

  initialise(): void {
    this.results = [];
    this.rowCovered = [];
    this.colCovered = [];
    this.numberHighlight = [];
    this.n = 0;
    this.originalMatrix = [];
    this.m = [];
    this.firstloop = true;
    this.stable = false;
    this.commandList = {
      originalMatrix: null,
      results: null,
      commands: []
    };
  }

  update(step: number, stepVariables?: Object): void {
    let hungarian: Hungarian = {
      matrix: Object.assign([], this.m.map( function(arr) { return arr.slice(); })),
      row: Object.assign([], this.rowCovered),
      col: Object.assign([], this.colCovered),
      highlight: Object.assign([], this.numberHighlight),
      lineNumber: step,
      stepVariables: stepVariables
    }

    this.commandList.commands.push(hungarian);
  }

  run(min: number, max: number,numLength: number): Object {

    this.initialise();

    this.n = numLength;
    this.originalMatrix = this.randomMatrix(min, max, numLength);
    this.m = this.originalMatrix.map(function(arr) {
        return arr.slice();
    });

    this.commandList["originalMatrix"] = this.originalMatrix;

    this.update(1);

    let step = 1;

    while (true) {
      let func = this.steps[step];
  
      if (typeof func != 'function') {
          break;
      }

      step = func.apply(this);
  
    }

    this.commandList["results"] = this.results;
    this.stable = this.checkStability(this.originalMatrix, this.results);

    return this.commandList;
  }

  step1(): number {
    let minNumber = [];

    for(let i=0; i<this.n; i++) {
      let number = this.getMinOfArray(this.m[i]);
      minNumber.push(number);
      for(let j=0; j<this.n; j++) {
        if(this.m[i][j] == number) {
          this.updateHighlightNumber(i,j);
        }
      }
    }

    this.update(2, {"%rowMin%": minNumber});

    this.subStractMinValue(this.m);

    this.update(3, {"%rowMin%": minNumber});

    this.clearHighlight();

    return 2;

  }

  step2(): number {
    let minNumber = [];

    let transMatrix = this.transpose(this.m);

    for(let i=0; i<this.n; i++) {
      let number = this.getMinOfArray(transMatrix[i]);
      minNumber.push(number);
      for(let j=0; j<this.n; j++) {
        if(transMatrix[i][j] == number) {
          this.updateHighlightNumber(j,i);
        }
      }
    }

    this.update(4, {"%colMin%": minNumber});

    this.m = this.transpose(this.subStractMinValue(transMatrix));

    this.update(5, {"%colMin%": minNumber});

    this.clearHighlight();

    return 3;

  }

  step3(): number {
    let count = 0;
    let mark = this.markZero(this.m);
    let rowZeroNumbers = [];
    let colZeroNumbers = [];

    this.clearCover();

    loop1: while (this.countMark(mark) > 0) {
        let transMatrix = this.transpose(mark);

        for (let i=0; i<this.n; i++) {
            rowZeroNumbers[i] = this.countZero(mark[i]);
            colZeroNumbers[i] = this.countZero(transMatrix[i]);
        }

        let maxZeroNumber = Math.max(this.getMaxOfArray(rowZeroNumbers), this.getMaxOfArray(colZeroNumbers));

        for (let i=0; i<this.n; i++) {
            if (rowZeroNumbers[i] == maxZeroNumber && !this.rowCovered[i]) {
                this.rowCovered[i] = true;
                for (let j=0; j<this.n; j++) {
                    mark[i][j] = 0;
                }
                count += 1;
                continue loop1;
            }
            else if (colZeroNumbers[i] == maxZeroNumber && !this.colCovered[i]) {
                this.colCovered[i] = true;
                for (let j=0; j<this.n; j++) {
                    mark[j][i] = 0;
                }
                count += 1;
                continue loop1;
            }
        }
    }

    let rowCoveredLine = [];
    let colCoveredLine = [];

    for(let i=0; i<this.n; i++) {
        if(this.rowCovered[i] == true) {
            rowCoveredLine.push(i+1);
        }
        if(this.colCovered[i] == true) {
            colCoveredLine.push(i+1);
        }
    }

    if(this.firstloop) {
        this.update(6, {"%line%": count, "%row%": rowCoveredLine, "%col%": colCoveredLine});
        this.firstloop = false;
    } else {
        this.update(10, {"%line%": count, "%row%": rowCoveredLine, "%col%": colCoveredLine});
    }

    this.update(7, {"%line%": count, "%n%": this.n});

    if (count >= this.n) {
        return 5;
    }
    else {
        return 4;
    }
  }

  step4(): number {
    let min = this.findSmallest(this.m);

    for (let i=0; i<this.n; i++) {
      for (let j=0; j<this.n; j++) {
          if (this.rowCovered[i] && this.colCovered[j]) {
              this.updateHighlightNumber(i,j);
          }
      }
    }

    this.update(8, {"%min%": min});

    for (let i=0; i<this.n; i++) {
        for (let j=0; j<this.n; j++) {
            if (this.rowCovered[i] && this.colCovered[j]) {
                this.m[i][j] += min;
            }
            else if (!this.rowCovered[i] && !this.colCovered[j]) {
                this.m[i][j] -= min;
            }
        }
    }

    this.update(9, {"%min%": min});

    this.clearHighlight();

    return 3;

  }

  step5(): number {
    let count = 0;
    let mark = this.markZero(this.m);
    let rowZeroNumbers = [];
    let colZeroNumbers = [];

    this.clearCover();

    while (count < this.n) {
      let transMatrix = this.transpose(mark);

      for (let i=0; i<this.n; i++) {
        rowZeroNumbers[i] = this.countZero(mark[i]);
        colZeroNumbers[i] = this.countZero(transMatrix[i]);
      }

      let sumZeroMatrix = this.sumMatrix(rowZeroNumbers, colZeroNumbers);
      let minZeroNumber = this.maxSize;

      let row, col: number = -1;
        
      for (let i=0; i<this.n; i++) {
        for(let j=0; j<this.n; j++) {
          if(mark[i][j] == 1 && !this.rowCovered[i] && !this.colCovered[j]) {
            if(sumZeroMatrix[i][j] < minZeroNumber) {
              minZeroNumber = sumZeroMatrix[i][j];
              row = i;
              col = j;
            }
          }
        }
      }

      if(row >= 0 && col >= 0) {
        this.rowCovered[row] = true;
        this.colCovered[col] = true;
        this.results.push([row, col]);
        this.updateHighlightNumber(row,col);
        count += 1;
        for(let i=0; i<this.n; i++) {
          mark[row][i] = 1;
          mark[i][col] = 1;
        }
      } else {
        console.log("error");
        break;
      }

    }

    let result = this.formatResult(this.results);

    this.clearCover();
;
    this.update(11, {"%result%": result});

    this.clearHighlight();

    return 6;

  }

  randomMatrix(min: number, max: number, length:number): number[][] {
    let matrix = [];
    min = Math.ceil(min);
    max = Math.floor(max);

    for(let i=0; i<length; i++) {
        matrix[i] = [];
        for(let j=0; j<length; j++) {
            matrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    return matrix;
  }

  transpose(array): number[][] {
    return array.reduce(function (prev, next) { return next.map(function (item, i) {
        return (prev[i] || []).concat(next[i]);
    }); }, []);
  }

  subStractMinValue(array): number[][] {
    for (let i=0; i<array.length; i++) {
        let min = this.getMinOfArray(array[i]);
        for (let j=0; j<array.length; j++) {
            array[i][j] -= min;
        }
    }

    return array;

  }

  markZero(array): number[][] {
    let newArray = this.makeMatrix(this.n, 0);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) {
                newArray[i][j] = 1;
            }
        }
    }

    return newArray;

  }

  clearCover(): void {
    for (let i=0; i<this.n; i++) {
        this.rowCovered[i] = false;
        this.colCovered[i] = false;
    }
  }

  makeMatrix(n: number, val: number): number[][] {
    let matrix = [];

    for (let i=0; i<n; i++) {
        matrix[i] = [];
        for (let j=0; j<n; j++)
            matrix[i][j] = val;
    }

    return matrix;

  }

  sumMatrix(array1: number[], array2: number[]): number[][] {
    let matrix = [];

    for (let i=0; i<array1.length; i++) {
        matrix[i] = [];
        for (let j=0; j<array2.length; j++)
            matrix[i][j] = array1[i] + array2[j];
    }

    return matrix;

  }

  countZero(array): number {
    let count = 0;

    for (let i=0; i<array.length; i++) {
        if (array[i] == 1) {
            count += 1;
        }
    }

    return count;

  }

  countMark(array: number[][]): number {
    return array.reduce(function (a, b) { return a.concat(b); }).reduce(function (a, b) { return a + b; });
  }

  getMaxOfArray(numArray: number[]): number {
    return Math.max.apply(null, numArray);
  }

  getMinOfArray(numArray: number[]): number {
    return Math.min.apply(null, numArray);
  }

  findSmallest(matrix: number[][]): number {
    let min = this.maxSize;
    let row = -1;
    let col = -1;

    for (let i=0; i<matrix.length; i++) {
        for (let j=0; j<matrix[i].length; j++) {
            if (!this.rowCovered[i] && !this.colCovered[j]) {
                if (min > this.m[i][j]) {
                    min = this.m[i][j];
                    row = i;
                    col = j;
                }
            }
        }
    }

    this.updateHighlightNumber(row,col);

    return min;

  }

  formatResult(matrix: number[][]): string {
    let formatted = '';

    for (let i=0; i<matrix.length; i++) {
        let s = String(matrix[i]);
        formatted = formatted + '[' + s + '], ';
    }

    return formatted;
  }

  updateHighlightNumber(row: number, col: number): void {
    let str = row.toString() + col.toString();
    this.numberHighlight.push(str);
  }

  clearHighlight(): void {
    this.numberHighlight = [];
  }

  permutator(inputArr: number[]) {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }

  checkStability(matrix: number[][], results: number[][]): boolean {
    let stability = true;
    let minNumber = this.maxSize;
    let permuteArray = [];
    let minResult = 0;

    for(let i=0; i<matrix.length; i++) {
      permuteArray.push(i);
    }

    let permuteResult = this.permutator(permuteArray);

    for(let array of permuteResult) {
      let sum = 0;
      for(let i=0; i<matrix.length; i++) {
        let col: number = array[i];
        sum += matrix[i][col];
      }
      if(sum < minNumber) {
        minNumber = sum;
      }
    }

    for(let entry of results) {
      let row = entry[0];
      let col = entry[1];
      minResult += this.originalMatrix[row][col];
    }

    if(minResult != minNumber) {
      stability = false;
    }

    return stability;
  }

}
