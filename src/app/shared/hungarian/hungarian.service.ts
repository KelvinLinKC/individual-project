import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HungarianService {

  constructor() { }
  
  originalMatrix: number[][];
  m: number[][];

  maxSize: number = Number.MAX_SAFE_INTEGER;
  n: number;
  rowCovered: boolean[] = [];
  colCovered: boolean[] = [];
  results = [];
  commandList = [];
  
  steps = {
      1: this.step1,
      2: this.step2,
      3: this.step3,
      4: this.step4,
      5: this.step5,
      6: 'Done'
  };


  hungarian(min: number, max: number,numLength: number): any[] {
    this.commandList = [];
    this.n = numLength;
    this.originalMatrix = this.randomMatrix(min, max, numLength);
    this.m = this.originalMatrix.map(function(arr) {
        return arr.slice();
    });

    this.commandList.push(1);

    let step = 1;

    // let steps = {
    //   1: this.step1(commandList),
    //   2: this.step2(commandList),
    //   3: this.step3(commandList),
    //   4: this.step4(commandList),
    //   5: this.step5(commandList),
    //   6: 'Done'
    // };

    console.log("---- Target Matrix ----");
    console.log(this.formatMatrix(this.originalMatrix));

    while (true) {
      let func = this.steps[step];
  
      if (typeof func != 'function') {
          break;
      }

      console.log("Step" + step);

      step = func.apply(this);

      console.log("---- Transition Matrix ----");
      console.log(this.formatMatrix(this.m));
  
    }

    console.log("---- Target Matrix ----");
    console.log(this.formatMatrix(this.originalMatrix));

    return this.commandList;
  }

  step1(): number {
    console.log('Subtract the smallest entry in each row from all the other entries in the row.\n');

    this.commandList.push(2);

    this.subStractMinValue(this.m);

    this.commandList.push(3);

    return 2;

  }

  step2(): number {
    console.log('Subtract the smallest entry in each column from all the other entries in the column.\n');

    this.commandList.push(4);

    let transMatrix = this.transpose(this.m);

    this.m = this.transpose(this.subStractMinValue(transMatrix));

    this.commandList.push(5);
    this.commandList.push(6);

    return 3;

  }

  step3(): number {
    console.log('Draw lines through the row and columns that have the 0 entries such that the fewest lines possible are drawn.\n');

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

    this.commandList.push(7);

    if (count >= this.n) {
        return 5;
    }
    else {
        return 4;
    }
  }

  step4(): number {
    console.log('Find the smallest entry not covered by any line. Subtract this entry from each row that isn’t crossed out, and then add it to each column that is crossed out.\n');
    
    let min = this.findSmallest(this.m);

    this.commandList.push(8);

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

    this.commandList.push(9);
    this.commandList.push(10);

    return 3;

  }

  step5(): number {
    console.log('If there are n lines drawn, an optimal assignment of zeros is possible and the algorithm is finished.\n');

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

    this.commandList.push(11);
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

    for (let i=0; i<matrix.length; i++) {
        for (let j=0; j<matrix[i].length; j++) {
            if (!this.rowCovered[i] && !this.colCovered[j]) {
                if (min > this.m[i][j]) {
                    min = this.m[i][j];
                }
            }
        }
    }

    return min;

  }

  formatMatrix(matrix: number[][]): string {
    let columnWidths = [];

    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            let entryWidth = String(matrix[i][j]).length;
            if (!columnWidths[j] || entryWidth >= columnWidths[j])
                columnWidths[j] = entryWidth;
        }
    }

    let formatted = '';

    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            let s = String(matrix[i][j]);
            // pad at front with spaces
            while (s.length < columnWidths[j])
                s = ' ' + s;
            formatted += s;
            // separate columns
            if (j != matrix[i].length - 1)
                formatted += ' ';
        }
        if (i != matrix[i].length - 1)
            formatted += '\n';
    }

    return formatted;

}

}
