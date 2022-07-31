// let m: number[][] = [
//     [400, 150, 400],
//     [400, 450, 600],
//     [300, 225, 300]
// ];

// const originalMatrix: number[][] = [
//     [1500, 4000, 4500],
//     [2000, 6000, 3500],
//     [2000, 4000, 2500],
// ];

// const originalMatrix: number[][] = [
//     [66, 91, 53, 86, 74],
//     [82, 2, 49, 63, 61],
//     [36, 42, 26, 46, 59],
//     [77, 31, 84, 78, 74],
//     [44, 15, 31, 49, 75],
// ];

const originalMatrix: number[][] = randomMatrix(1, 100, 3);

let m: number[][] = originalMatrix.map(function(arr) {
    return arr.slice();
});

let maxSize: number = Number.MAX_SAFE_INTEGER;
let n: number = m[0].length;
let rowCovered: boolean[] = [];
let colCovered: boolean[] = [];
let results = [];

let step = 1;
let steps = {
    1: step1,
    2: step2,
    3: step3,
    4: step4,
    5: step5,
    6: 'Done'
};

function step1(): number {
    console.log('Subtract the smallest entry in each row from all the other entries in the row.\n');

    console.log(formatMatrix(m) + '\n');

    subStractMinValue(m);

    console.log(formatMatrix(m) + '\n');

    return 2;

}

function step2(): number {
    console.log('Subtract the smallest entry in each column from all the other entries in the column.\n');

    let transMatrix = transpose(m);

    m = transpose(subStractMinValue(transMatrix));

    console.log(formatMatrix(m) + '\n');

    return 3;

}

function step3(): number {
    console.log('Draw lines through the row and columns that have the 0 entries such that the fewest lines possible are drawn.\n');

    let count = 0;
    let mark = markZero(m);
    let rowZeroNumbers = [];
    let colZeroNumbers = [];

    clearCover();

    loop1: while (countMark(mark) > 0) {
        let transMatrix = transpose(mark);

        for (let i = 0; i < n; i++) {
            rowZeroNumbers[i] = countZero(mark[i]);
            colZeroNumbers[i] = countZero(transMatrix[i]);
        }

        let maxZeroNumber = Math.max(getMaxOfArray(rowZeroNumbers), getMaxOfArray(colZeroNumbers));

        for (let i = 0; i < n; i++) {
            if (rowZeroNumbers[i] == maxZeroNumber && !rowCovered[i]) {
                rowCovered[i] = true;
                for (let j = 0; j < n; j++) {
                    mark[i][j] = 0;
                }
                count += 1;
                continue loop1;
            }
            else if (colZeroNumbers[i] == maxZeroNumber && !colCovered[i]) {
                colCovered[i] = true;
                for (let j = 0; j < n; j++) {
                    mark[j][i] = 0;
                }
                count += 1;
                continue loop1;
            }
        }
    }

    console.log(formatMatrix(m) + '\n');
    console.log('Row covered line: ' + rowCovered + '\n');
    console.log('Col covered line: ' + colCovered + '\n');
    console.log('Line count: ' + count + '\n');

    if (count >= n) {
        return 5;
    }
    else {
        return 4;
    }
}

// function step3(): number {
//     console.log('Draw lines through the row and columns that have the 0 entries such that the fewest lines possible are drawn.\n');

//     let count = 0;
//     let mark = markZero(m);
//     let rowZeroNumbers = [];
//     let colZeroNumbers = [];

//     clearCover();

//     console.log(formatMatrix(mark) + '\n');

//     while (countMark(mark) > 0) {
//         let transMatrix = transpose(mark);

//         for (let i = 0; i < n; i++) {
//             rowZeroNumbers[i] = countZero(mark[i]);
//             colZeroNumbers[i] = countZero(transMatrix[i]);
//         }

//         let maxZeroNumber = Math.max(getMaxOfArray(rowZeroNumbers), getMaxOfArray(colZeroNumbers));

//         for (let i = 0; i < n; i++) {
//             if (rowZeroNumbers[i] == maxZeroNumber && !rowCovered[i]) {
//                 rowCovered[i] = true;
//                 for (let j = 0; j < n; j++) {
//                     mark[i][j] = 0;
//                 }
//                 count += 1;
//             }
//             if (colZeroNumbers[i] == maxZeroNumber && !colCovered[i]) {
//                 colCovered[i] = true;
//                 for (let j = 0; j < n; j++) {
//                     mark[j][i] = 0;
//                 }
//                 count += 1;
//             }
//         }

//         console.log(formatMatrix(mark) + '\n');
//         console.log(maxZeroNumber);
//         console.log(rowZeroNumbers);
//         console.log(colZeroNumbers);

//     }

//     console.log(rowCovered);
//     console.log(colCovered);
    
//     let abundantRow: number[][] = findAbundantRow();
//     let abundantCol: number[][] = findAbundantCol();

//     while(abundantRow || abundantCol) {

//         console.log(abundantRow);
//         console.log(abundantCol);


//         let minCrossZeroCOunt = maxSize;
//         let line = -1;
//         let row = true;

//         for(let i=0; i<abundantRow.length; i++) {
//             console.log(abundantRow[i][1]);
//             if(abundantRow[i][1] < minCrossZeroCOunt) {
//                 minCrossZeroCOunt = abundantRow[i][1];
//                 line = abundantRow[i][0];
//                 row = true;
//             }
//         }
//         for(let i=0; i<abundantCol.length; i++) {
//             if(abundantCol[i][1] < minCrossZeroCOunt) {
//                 minCrossZeroCOunt = abundantCol[i][1];
//                 line = abundantCol[i][0];
//                 row = false;
//             }
//         }

//         if(line >= 0) {
//             console.log(line);
//             console.log(row);
//             if(row) {
//                 rowCovered[line] = false;
//                 count -=1;
//             } else {
//                 colCovered[line] = false;
//                 count -=1;
//             }
//             abundantRow = findAbundantRow();
//             abundantCol = findAbundantCol();
//         } else {
//             break;
//         }
//     }

//     console.log(formatMatrix(m) + '\n');
//     console.log('Row covered line: ' + rowCovered + '\n');
//     console.log('Col covered line: ' + colCovered + '\n');
//     console.log('Line count: ' + count + '\n');

//     if (count >= n) {
//         return 5;
//     }
//     else {
//         return 4;
//     }
// }

function step4(): number {
    console.log('Find the smallest entry not covered by any line. Subtract this entry from each row that isn’t crossed out, and then add it to each column that is crossed out.\n');
    
    let min = findSmallest(m);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (rowCovered[i] && colCovered[j]) {
                m[i][j] += min;
            }
            else if (!rowCovered[i] && !colCovered[j]) {
                m[i][j] -= min;
            }
        }
    }

    console.log('Minimal number of uncovered entries: ' + min + '\n');
    console.log(formatMatrix(m) + '\n');

    return 3;

}

function step5(): number {
    console.log('If there are n lines drawn, an optimal assignment of zeros is possible and the algorithm is finished.\n');

    let count = 0;
    let mark = markZero(m);
    let rowZeroNumbers = [];
    let colZeroNumbers = [];

    clearCover();

    while (count < n) {
        let transMatrix = transpose(mark);

        for (let i = 0; i < n; i++) {
            rowZeroNumbers[i] = countZero(mark[i]);
            colZeroNumbers[i] = countZero(transMatrix[i]);
        }

        let sumZeroMatrix = sumMatrix(rowZeroNumbers, colZeroNumbers);
        let minZeroNumber = maxSize;

        let row, col: number = -1;
        
        for (let i=0; i<n; i++) {
            for(let j=0; j<n; j++) {
                if(mark[i][j] == 1 && !rowCovered[i] && !colCovered[j]) {
                    if(sumZeroMatrix[i][j] < minZeroNumber) {
                        minZeroNumber = sumZeroMatrix[i][j];
                        row = i;
                        col = j;
                    }
                }
            }
        }

        if(row >= 0 && col >= 0) {
            rowCovered[row] = true;
            colCovered[col] = true;
            results.push([row, col]);
            count += 1;
            for(let i=0; i<n; i++) {
                mark[row][i] = 1;
                mark[i][col] = 1;
            }
        } else {
            console.log("error");
            break;
        }

    }

    console.log(formatMatrix(originalMatrix) + '\n');
    console.log(results);

    return 6;

}

function transpose(array): number[][] {
    return array.reduce(function (prev, next) { return next.map(function (item, i) {
        return (prev[i] || []).concat(next[i]);
    }); }, []);
}

function subStractMinValue(array): number[][] {
    for (let i = 0; i < array.length; i++) {
        let min = getMinOfArray(array[i]);
        for (let j = 0; j < array.length; j++) {
            array[i][j] -= min;
        }
    }

    return array;

}

function markZero(array): number[][] {
    let newArray = makeMatrix(n, 0);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) {
                newArray[i][j] = 1;
            }
        }
    }

    return newArray;

}

function clearCover(): void {
    for (let i = 0; i < n; i++) {
        rowCovered[i] = false;
        colCovered[i] = false;
    }
}

// function clearMarkToOne(array: number[]): void {
//     for (let i = 0; i < n; i++) {
//         array[i] = 1;
//     }
// }

function makeMatrix(n: number, val: number): number[][] {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++)
            matrix[i][j] = val;
    }

    return matrix;

}

function sumMatrix(array1: number[], array2: number[]): number[][] {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++)
            matrix[i][j] = array1[i] + array2[j];
    }

    return matrix;

}

function randomMatrix(min: number, max: number, length:number): number[][] {
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

function countZero(array): number {
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            count += 1;
        }
    }

    return count;

}

function countMark(array: number[][]): number {
    return array.reduce(function (a, b) { return a.concat(b); }).reduce(function (a, b) { return a + b; });
}

function getMaxOfArray(numArray: number[]): number {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray: number[]): number {
    return Math.min.apply(null, numArray);
}

function findSmallest(array: number[][]): number {
    let min = maxSize;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!rowCovered[i] && !colCovered[j]) {
                if (min > m[i][j]) {
                    min = m[i][j];
                }
            }
        }
    }

    return min;

}

function formatMatrix(matrix: number[][]): string {
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

// function findMinLineCount(array1: number[], array2: number[], max: number): number {
//     let count = 0;
    
//     for(let i=0; i<array1.length; i++) {
//         if(array1[i] == 1 && array2[i] == max) {
//             count += 1;
//         }
//     }

//     return count;
    
// }

// function findAbundantRow(): number[][] {
//     let array: number[][] = [];
//     loop1:
//     for(let i=0; i<n; i++) {
//         if(rowCovered[i]) {
//             let count: number = 0
//             for(let j=0; j<n; j++) {
//                 if(m[i][j] == 0 && colCovered[j]) {
//                     count +=1;
//                 } else if(m[i][j] == 0) {
//                     continue loop1;
//                 }
//             }
//             array.push([i, count]);
//         }
//     }
//     return array;
// }

// function findAbundantCol(): number[][] {
//     let array: number[][] = [];
//     loop1:
//     for(let i=0; i<n; i++) {
//         if(colCovered[i]) {
//             let count: number = 0
//             for(let j=0; j<n; j++) {
//                 if(m[j][i] == 0 && rowCovered[j]) {
//                     count +=1;
//                 } else if(m[j][i] == 0) {
//                     continue loop1;
//                 }
//             }
//             array.push([i, count]);
//         }
//     }
//     return array;
// }

console.log(formatMatrix(m) + '\n');

while (true) {
    let func = steps[step];

    console.log(func);

    if (typeof func != 'function') {
        break;
    }

    step = func.apply(this);

}

// console.log(step1);
// step1();
// console.log(step2);
// step2();
// console.log(step3);
// step3();
