// let m: number[][] = [
//     [400, 150, 400],
//     [400, 450, 600],
//     [300, 225, 300]
// ];
var originalMatrix = [
    [1500, 4000, 4500],
    [2000, 6000, 3500],
    [2000, 4000, 2500],
];
var m = [
    [1500, 4000, 4500],
    [2000, 6000, 3500],
    [2000, 4000, 2500],
];
var maxSize = Number.MAX_SAFE_INTEGER;
var n = m[0].length;
var rowCovered = [];
var colCovered = [];
var results = [];
var step = 1;
var steps = {
    1: step1,
    2: step2,
    3: step3,
    4: step4,
    5: step5,
    6: 'Done'
};
function step1() {
    console.log('Subtract the smallest entry in each row from all the other entries in the row.\n');
    subStractMinValue(m);
    console.log(formatMatrix(m) + '\n');
    return 2;
}
;
function step2() {
    console.log('Subtract the smallest entry in each column from all the other entries in the column.\n');
    var transMatrix = transpose(m);
    m = transpose(subStractMinValue(transMatrix));
    console.log(formatMatrix(m) + '\n');
    return 3;
}
;
function step3() {
    console.log('Draw lines through the row and columns that have the 0 entries such that the fewest lines possible are drawn.\n');
    var count = 0;
    var mark = markZero(m);
    var rowZeroNumbers = [];
    var colZeroNumbers = [];
    clearCover();
    loop1: while (countMark(mark) > 0) {
        var transMatrix = transpose(mark);
        for (var i = 0; i < n; i++) {
            rowZeroNumbers[i] = countZero(mark[i]);
            colZeroNumbers[i] = countZero(transMatrix[i]);
        }
        var maxZeroNumber = Math.max(getMaxOfArray(rowZeroNumbers), getMaxOfArray(colZeroNumbers));
        for (var i = 0; i < n; i++) {
            if (rowZeroNumbers[i] == maxZeroNumber && !rowCovered[i]) {
                rowCovered[i] = true;
                for (var j = 0; j < n; j++) {
                    mark[i][j] = 0;
                }
                count += 1;
                continue loop1;
            }
            else if (colZeroNumbers[i] == maxZeroNumber && !colCovered[i]) {
                colCovered[i] = true;
                for (var j = 0; j < n; j++) {
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
;
function step4() {
    console.log('Find the smallest entry not covered by any line. Subtract this entry from each row that isn’t crossed out, and then add it to each column that is crossed out.\n');
    var min = findSmallest(m);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
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
function step5() {
    console.log('If there are nn lines drawn, an optimal assignment of zeros is possible and the algorithm is finished.\n');
    var count = 0;
    var mark = markZero(m);
    var rowZeroNumbers = [];
    clearCover();
    loop1: while (count < n) {
        for (var i = 0; i < n; i++) {
            rowZeroNumbers[i] = countZero(mark[i]);
            rowCovered[i] = true;
        }
        var minZeroNumber = getMinOfArray(rowZeroNumbers);
        for (var i = 0; i < n; i++) {
            if (rowZeroNumbers[i] == minZeroNumber) {
                for (var j = 0; j < n; j++) {
                    if (mark[i][j] == 1 && !colCovered[j]) {
                        colCovered[j] = true;
                        results.push([i, j]);
                        clearMarkToOne(mark[i]);
                        count += 1;
                        continue loop1;
                    }
                }
            }
        }
    }
    console.log(formatMatrix(originalMatrix) + '\n');
    console.log(results);
    return 6;
}
function transpose(array) {
    return array.reduce(function (prev, next) { return next.map(function (item, i) {
        return (prev[i] || []).concat(next[i]);
    }); }, []);
}
;
function subStractMinValue(array) {
    for (var i = 0; i < array.length; i++) {
        var min = getMinOfArray(array[i]);
        for (var j = 0; j < array.length; j++) {
            array[i][j] -= min;
        }
    }
    return array;
}
;
function markZero(array) {
    var newArray = makeMatrix(n, 0);
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) {
                newArray[i][j] = 1;
            }
        }
    }
    return newArray;
}
function clearCover() {
    for (var i = 0; i < n; i++) {
        rowCovered[i] = false;
        colCovered[i] = false;
    }
}
function clearMarkToOne(array) {
    for (var i = 0; i < n; i++) {
        array[i] = 1;
    }
}
function makeMatrix(n, val) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        matrix[i] = [];
        for (var j = 0; j < n; j++)
            matrix[i][j] = val;
    }
    return matrix;
}
function countZero(array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            count += 1;
        }
    }
    return count;
}
function countMark(array) {
    return array.reduce(function (a, b) { return a.concat(b); }).reduce(function (a, b) { return a + b; });
}
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}
function findSmallest(array) {
    var min = maxSize;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (!rowCovered[i] && !colCovered[j]) {
                if (min > m[i][j]) {
                    min = m[i][j];
                }
            }
        }
    }
    return min;
}
function formatMatrix(matrix) {
    var columnWidths = [];
    for (var i = 0; i < matrix.length; ++i) {
        for (var j = 0; j < matrix[i].length; ++j) {
            var entryWidth = String(matrix[i][j]).length;
            if (!columnWidths[j] || entryWidth >= columnWidths[j])
                columnWidths[j] = entryWidth;
        }
    }
    var formatted = '';
    for (var i = 0; i < matrix.length; ++i) {
        for (var j = 0; j < matrix[i].length; ++j) {
            var s = String(matrix[i][j]);
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
console.log(formatMatrix(m) + '\n');
while (true) {
    var func = steps[step];
    console.log(func);
    if (typeof func != 'function') {
        break;
    }
    step = func.apply(this);
}
